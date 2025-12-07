
// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';
import * as KVS from "@spinframework/spin-kv";

async function handler() {
  try {
    let kvs = KVS.openDefault();

    kvs.setJson("foo", `{ "val": 200 }`);
    let ret = kvs.getJson("foo");
    return new Response('ret:' + ret);
  }
  catch (err) {
    return new Response('ERR:' + err + '[' + err.payload + ']');
  }
}

let router = AutoRouter();

// Route ordering matters, the first route that matches will be used
// Any route that does not return will be treated as a middleware
// Any unmatched route will return a 404
router
    .get('/', handler)
    .get('/hello/:name', ({ name }) => `Hello, ${name}!`)

addEventListener('fetch', (event) => {
    event.respondWith(router.fetch(event.request));
});

