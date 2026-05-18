#!/usr/bin/env node

import { Command } from 'commander';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { removeCommand } from './commands/remove.js';

const program = new Command();

program
  .name('josbert')
  .description('CLI para agregar componentes de josbert.dev')
  .version('0.1.0');

program
  .command('add <component>')
  .description('Agrega un componente al proyecto. Ej: josbert add pricing-section')
  .option('--no-install', 'No instala dependencias npm')
  .action(addCommand);

program
  .command('list')
  .description('Lista los componentes disponibles en el registry')
  .option('-u, --user <username>', 'Usuario del registry')
  .action(listCommand);

program
  .command('remove <component>')
  .description('Elimina un componente y sus archivos del proyecto')
  .option('--dry-run', 'Muestra qué se borraría sin eliminar nada')
  .option('--working-dir <dir>', 'Directorio base de los archivos', 'src')
  .action(removeCommand);

program.parse();
