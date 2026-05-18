import chalk from 'chalk';
import ora from 'ora';
import { DEFAULT_AUTHOR, fetchUserProfile } from '../registry.js';

export async function listCommand(options: { user?: string }): Promise<void> {
  const username = options.user ?? DEFAULT_AUTHOR;

  const spinner = ora(`Cargando componentes de ${chalk.cyan(username)}...`).start();

  let components;
  try {
    const profile = await fetchUserProfile(username);
    components = profile.components;
    spinner.succeed(`${chalk.cyan(username)} — ${components.length} componente(s)`);
  } catch (err) {
    spinner.fail(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  if (components.length === 0) {
    console.log(chalk.dim('  Sin componentes publicados.'));
    return;
  }

  console.log('');

  const maxName = Math.max(...components.map((c) => c.name.length));

  for (const c of components) {
    const name = chalk.cyan(c.name.padEnd(maxName + 2));
    const title = c.title ? chalk.white(c.title) : '';
    const tags = c.tags?.length ? chalk.dim(`  [${c.tags.join(', ')}]`) : '';
    console.log(`  ${name}${title}${tags}`);
  }

  console.log('');
  console.log(chalk.dim(`josbert add <name> para instalar`));
}
