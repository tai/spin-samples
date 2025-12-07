
// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';

async function handler() {
  try {
    let ret = await fetch('https://www.nic.ad.jp/');
    let body = await ret.text();

    return new Response(body);
  }
  catch (err) {
    return new Response(`ERR: ${err}\n` + JSON.stringify(err.payload));
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

