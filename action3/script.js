export default async function doStuff({github, context}) {
  const { data: repo } = await github.rest.repos.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
  });
  console.log(`Event ${context.eventName} on ${repo.full_name}`);

  return "hello from script.js";
  // return context.payload.client_payload.value;
}