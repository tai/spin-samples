// For AutoRouter documentation refer to https://itty.dev/itty-router/routers/autorouter
import { AutoRouter } from 'itty-router';

// Initialize the router
let router = AutoRouter();

// Define a route that responds to GET requests 
router.get("/", (request) => {
    // Parse the request URL to access query parameters
    const url = new URL(request.url);

    // Capture the current timestamp
    const now = new Date().toISOString();

    // Log every time the route is triggered, including the message (if any)
    console.log(`Cron job triggered at ${now}"`);

    // Return a generic success response
    return new Response("Cron job executed", {
        status: 200,
    });
});

// Attach the router to the fetch event
addEventListener('fetch', (event) => {
    event.respondWith(router.fetch(event.request));
});
