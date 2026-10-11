import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const root = new URL('../CI-blog/', import.meta.url);
const articles = fs.readdirSync(root, {withFileTypes:true}).filter(e=>e.isDirectory() && fs.existsSync(new URL(`${e.name}/index.html`, root)));
const css = fs.readFileSync(new URL('../assets/article-theme.css',import.meta.url),'utf8');
const script = fs.readFileSync(new URL('../assets/article-theme.js',import.meta.url),'utf8');
test('all 40 articles load the shared palettes and have no fixed dark body or text colors', () => {
  assert.equal(articles.length,40);
  assert.match(css,/html\[data-theme="dark"\].*--bg:#081525/);
  assert.match(css,/html\[data-theme="light"\].*--bg:#f4f7fa/);
  for (const article of articles) {
    const html = fs.readFileSync(new URL(`${article.name}/index.html`,root),'utf8');
    assert.ok(html.includes('/assets/article-theme.css?v=1'),article.name);
    assert.ok(html.includes('/assets/article-theme.js?v=1'),article.name);
    assert.doesNotMatch(html,/(?<!-)background:#081525|(?<!-)color:#f8fafc|(?<!-)color:rgba\(248,250,252,/);
    assert.doesNotMatch(html,/function toggleTheme\(/);
  }
});
function load(localStorage) {
  const attributes = new Map();
  const button = {setAttribute(){}};
  const document = {documentElement:{setAttribute:(k,v)=>attributes.set(k,v),getAttribute:k=>attributes.get(k)},getElementById:()=>button};
  const window = {};
  vm.runInNewContext(script,{document,localStorage,window});
  return {attributes,window,button};
}
test('light and dark switch both ways and survive a new page load',()=>{
  const storage = new Map([['geodriv-theme','light']]);
  const localStorage = {getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)};
  const page = load(localStorage);
  assert.equal(page.attributes.get('data-theme'),'light');
  page.window.toggleTheme();
  assert.equal(page.attributes.get('data-theme'),'dark');
  assert.equal(load(localStorage).attributes.get('data-theme'),'dark');
  page.window.toggleTheme();
  assert.equal(page.attributes.get('data-theme'),'light');
  assert.equal(load(localStorage).attributes.get('data-theme'),'light');
});
test('switching works when browser storage is unavailable',()=>{
  const page=load({getItem(){throw Error('blocked')},setItem(){throw Error('blocked')}});
  assert.equal(page.attributes.get('data-theme'),'dark');
  page.window.toggleTheme();
  assert.equal(page.attributes.get('data-theme'),'light');
});
