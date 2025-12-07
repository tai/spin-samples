
// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';
import { OpenRouter } from '@openrouter/sdk';
import * as SV from '@spinframework/spin-variables';

async function handler() {
  try {
    const OR = new OpenRouter({ apiKey: SV.get('api_key') });

    const completion = await OR.chat.send({
      model: 'openai/gpt-oss-20b:free',
      messages: [{
        role: 'user',
        content: 'What model are you based on?',
      }],
      stream: false,
    });

    let ans = completion.choices[0].message.content;

    return new Response(`RET: ${ans}`);
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

