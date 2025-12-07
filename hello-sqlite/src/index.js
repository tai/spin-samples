
// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';
import * as SQLite from "@spinframework/spin-sqlite";

async function handler() {
  let output = 'List of shops:';

  try {
    const db = SQLite.openDefault();
    const ret = db.execute("SELECT DISTINCT shopname FROM sales;", [])

    ret.rows.forEach(row => {
      output += `[${row['shopname']}]`
    });

    return new Response(output);
  }
  catch (err) {
    return new Response('ERROR: ' + err);
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

