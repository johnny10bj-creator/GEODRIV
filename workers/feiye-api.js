import {proxy} from './secure-proxy.mjs';

export default {
  fetch(request, env) { return proxy(request, env, '/feiye/api/dify'); },
};
