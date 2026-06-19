export default async function doStuff({github, context}) {
  return "hello from script.js";
  // return context.payload.client_payload.value;
}