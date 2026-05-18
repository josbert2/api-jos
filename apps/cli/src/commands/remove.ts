import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { DEFAULT_AUTHOR } from '../registry.js';
import { readManifest, removeFromManifest, MANIFEST_FILE } from '../manifest.js';

export async function removeCommand(
  componentArg: string,
  options: { dryRun?: boolean; workingDir?: string }
): Promise<void> {
  let author = DEFAULT_AUTHOR;
  let name = componentArg;

  if (componentArg.includes('/')) {
    [author, name] = componentArg.split('/');
  }

  const workingDir = options.workingDir ?? 'src';
  const cwd = process.cwd();

  const manifest = readManifest(cwd);
  const entry = manifest.find((e) => e.name === name && e.author === author);

  if (!entry) {
    console.error(chalk.red(`Componente "${author}/${name}" no encontrado en ${MANIFEST_FILE}.`));
    console.log(chalk.dim('Verificá con: josbert list --local'));
    process.exit(1);
  }

  console.log(chalk.blue(`Eliminando ${chalk.cyan(`${author}/${name}`)}...`));
  if (options.dryRun) {
    console.log(chalk.yellow('  [dry-run] No se eliminará nada.'));
  }

  const files: string[] = (entry.registryItem?.files ?? []).map((f) => {
    let p = f.path.startsWith('/') ? f.path.slice(1) : f.path;
    if (!p.startsWith(workingDir)) p = path.join(workingDir, p);
    return p;
  });

  let deleted = 0;
  for (const rel of files) {
    const full = path.join(cwd, rel);
    if (!fs.existsSync(full)) {
      console.log(chalk.dim(`  no existe: ${rel}`));
      continue;
    }
    if (options.dryRun) {
      console.log(chalk.green(`  borraría: ${rel}`));
    } else {
      try {
        fs.unlinkSync(full);
        console.log(chalk.green(`  eliminado: ${rel}`));
        deleted++;
      } catch (err) {
        console.error(chalk.red(`  error al eliminar ${rel}: ${err instanceof Error ? err.message : err}`));
      }
    }
  }

  if (!options.dryRun) {
    removeFromManifest(name, author, cwd);
    console.log('');
    console.log(chalk.cyan(`Eliminado del ${MANIFEST_FILE}. ${deleted} archivo(s) borrado(s).`));
  } else {
    console.log('');
    console.log(chalk.dim('Dry-run completo. Pasá sin --dry-run para eliminar.'));
  }
}
