import {test} from 'node:test';
import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import {proxy} from '../workers/secure-proxy.mjs';

globalThis.crypto ??= webcrypto;
const pair = await crypto.subtle.generateKey({name:'RSASSA-PKCS1-v1_5',modulusLength:2048,publicExponent:new Uint8Array([1,0,1]),hash:'SHA-256'},true,['sign','verify']);
const jwk = {...await crypto.subtle.exportKey('jwk',pair.publicKey),kid:'test-key',alg:'RS256',use:'sig'};
const env={ACCESS_TEAM_DOMAIN:'https://test-team.cloudflareaccess.com',ACCESS_AUD:'test-audience',DIFY_API_KEY:'synthetic-test-key',ALLOWED_ORIGIN:'https://private.example'};
const originalFetch=globalThis.fetch;
let upstreamCalls=[];
globalThis.fetch=async (url,options)=>{
  if(String(url).endsWith('/cdn-cgi/access/certs'))return Response.json({keys:[jwk]});
  upstreamCalls.push({url,options});return Response.json({ok:true});
};
function encode(value){return Buffer.from(JSON.stringify(value)).toString('base64url');}
async function token(overrides={},headerOverrides={}){
  const header=encode({alg:'RS256',kid:'test-key',...headerOverrides});
  const claims=encode({iss:env.ACCESS_TEAM_DOMAIN,aud:[env.ACCESS_AUD],exp:Math.floor(Date.now()/1000)+300,sub:'verified-user',...overrides});
  const signature=await crypto.subtle.sign('RSASSA-PKCS1-v1_5',pair.privateKey,new TextEncoder().encode(`${header}.${claims}`));
  return `${header}.${claims}.${Buffer.from(signature).toString('base64url')}`;
}
function request(jwt,path='/aerospace/api/workflows/run',extra={}){
  return new Request(`https://geodriv.com${path}`,{method:'POST',headers:{'Content-Type':'application/json',...(jwt?{'Cf-Access-Jwt-Assertion':jwt}:{}),...extra},body:JSON.stringify({inputs:{},user:'untrusted-client-user'})});
}
test('proxy refuses absent credentials, invalid audience, expiry, issuer and signature without calling Dify',async()=>{
  const forged=(await token()).split('.');forged[2]='invalid';
  for(const jwt of [null,await token({aud:['wrong']}),await token({exp:0}),await token({iss:'https://wrong.cloudflareaccess.com'}),await token({nbf:Math.floor(Date.now()/1000)+3600}),await token({}, {alg:'none'}),forged.join('.')]){
    upstreamCalls=[];const response=await proxy(request(jwt),env,'/aerospace/api');assert.equal(response.status,403);assert.equal(upstreamCalls.length,0);
  }
});
test('configuration fails closed and does not expose error details',async()=>{
  for(const configuration of [{},{...env,ACCESS_AUD:''},{...env,ACCESS_TEAM_DOMAIN:'https://attacker.example'}]){
    assert.equal((await proxy(request(await token()),configuration,'/aerospace/api')).status,403);
  }
  upstreamCalls=[];assert.equal((await proxy(request(await token()),{...env,DIFY_API_KEY:''},'/aerospace/api')).status,503);assert.equal(upstreamCalls.length,0);
});
test('authenticated request pins upstream endpoint and identity and strips incoming credentials',async()=>{
  upstreamCalls=[];const response=await proxy(request(await token(),'/aerospace/api/workflows/run?redirect=https://attacker.example',{Authorization:'untrusted-token',Cookie:'private-cookie',Origin:env.ALLOWED_ORIGIN}),env,'/aerospace/api');
  assert.equal(response.status,200);assert.equal(upstreamCalls.length,1);
  const call=upstreamCalls[0];assert.equal(call.url,'https://api.dify.ai/v1/workflows/run');assert.equal(JSON.parse(call.options.body).user,'verified-user');
  assert.equal(call.options.headers.get('Authorization'),'Bearer synthetic-test-key');assert.equal(call.options.headers.has('Cookie'),false);assert.equal(call.options.headers.has('Cf-Access-Jwt-Assertion'),false);assert.equal(call.options.redirect,'error');
});
test('wrong origin, arbitrary endpoints, methods and route-prefix lookalikes are rejected',async()=>{
  upstreamCalls=[];assert.equal((await proxy(request(await token(),undefined,{Origin:'https://attacker.example'}),env,'/aerospace/api')).status,403);
  assert.equal((await proxy(request(await token(),'/aerospace/api/admin'),env,'/aerospace/api')).status,404);
  assert.equal((await proxy(request(await token(),'/aerospace/apix/workflows/run'),env,'/aerospace/api')).status,404);
  assert.equal((await proxy(new Request('https://geodriv.com/aerospace/api/workflows/run'),env,'/aerospace/api')).status,405);assert.equal(upstreamCalls.length,0);
});
test('uploads replace user identity and preserve multipart file data',async()=>{
  const form=new FormData();form.set('file',new Blob(['test file'],{type:'text/plain'}),'test.txt');form.set('user','untrusted');
  upstreamCalls=[];const req=new Request('https://geodriv.com/feiye/api/dify/files/upload',{method:'POST',headers:{'Cf-Access-Jwt-Assertion':await token()},body:form});
  assert.equal((await proxy(req,env,'/feiye/api/dify')).status,200);assert.equal(upstreamCalls[0].options.body.get('user'),'verified-user');assert.equal(await upstreamCalls[0].options.body.get('file').text(),'test file');
});
test.after(()=>{globalThis.fetch=originalFetch;});
