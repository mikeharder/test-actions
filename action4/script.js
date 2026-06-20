import { readdir } from 'fs/promises';
import { dirname } from 'path';

export default async function doStuff({github, context}) {
  console.log(JSON.stringify(process.env, null, 2));

  if (context.eventName === 'pull_request') {
    const { data: pr } = await github.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request.number,
    });
    console.log(JSON.stringify(pr, null, 2));
  }

  const actionPath = process.env.GITHUB_ACTION_PATH;
  console.log(await readdir(actionPath));
  console.log(await readdir(dirname(actionPath)));
}