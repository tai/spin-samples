
// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';
import * as LLM from "@spinframework/spin-llm";

async function handler() {
  try {
    console.log(LLM.InferencingModels);
    let model = 'llama2-chat';
    let query = `
<<SYS>>You are a general QA bot.<</SYS>>
[INST]Respond with a short sentence.[/INST]
What model are you based on?
`
    let options = { maxTokens: 50 };
    let ret = LLM.infer(model, query, options);
    return new Response('RET:' + ret.text);
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

