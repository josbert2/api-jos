import { execSync } from 'node:child_process';
import chalk from 'chalk';
import ora from 'ora';
import { DEFAULT_AUTHOR, fetchRegistryComponent, registryUrl } from '../registry.js';
import { upsertManifest, MANIFEST_FILE } from '../manifest.js';
import type { ManifestEntry } from '../types.js';

export async function addCommand(componentArg: string, options: { noInstall?: boolean }): Promise<void> {
  let author = DEFAULT_AUTHOR;
  let name = componentArg;

  if (componentArg.includes('/')) {
    [author, name] = componentArg.split('/');
  }

  const spinner = ora(`Verificando ${chalk.cyan(`${author}/${name}`)}...`).start();

  let registryItem;
  try {
    registryItem = await fetchRegistryComponent(author, name);
    spinner.succeed(
      `${chalk.cyan(`${author}/${name}`)}${registryItem.title ? chalk.dim(` — ${registryItem.title}`) : ''}`
    );
    if (registryItem.description) {
      console.log(chalk.dim(`   ${registryItem.description}`));
    }
  } catch (err) {
    spinner.fail(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  const url = registryUrl(author, name);
  const flag = options.noInstall ? '--no-install' : '';
  const cmd = `npx -y shadcn@latest add --overwrite ${flag} "${url}"`.replace(/\s+/g, ' ').trim();

  console.log('');
  console.log(chalk.blue('Ejecutando:'), chalk.dim(cmd));
  console.log('');

  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err: any) {
    process.exit(typeof err?.status === 'number' ? err.status : 1);
  }

  const entry: ManifestEntry = {
    name,
    author,
    sourceUrl: url,
    registryItem,
    addedAt: new Date().toISOString(),
  };
  upsertManifest(entry);
  console.log('');
  console.log(chalk.cyan(`Registrado en ${MANIFEST_FILE}.`));
}
