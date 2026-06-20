import { readdir } from 'fs/promises';
import { dirname } from 'path';
import type { context as ghContext } from '@actions/github';
import type { GitHub } from '@actions/github/lib/utils';

export default async function doStuff({
  github,
  context,
}: {
  github: InstanceType<typeof GitHub>;
  context: typeof ghContext;
}): Promise<void> {
  console.log(JSON.stringify(process.env, null, 2));

  if (context.eventName === 'pull_request' && context.payload.pull_request) {
    const { data: pr } = await github.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request.number,
    });
    console.log(JSON.stringify(pr, null, 2));
  }

  const actionPath = process.env.GITHUB_ACTION_PATH;
  if (actionPath) {
    console.log(await readdir(actionPath));
    console.log(await readdir(dirname(actionPath)));
  }
}