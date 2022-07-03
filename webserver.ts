import { serve } from "https://deno.land/std@0.146.0/http/server.ts";

const port = 8080;

const handler = (request: Request): Response => {
  return new Response("Hello world", { status: 200 });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await serve(handler, { port });
