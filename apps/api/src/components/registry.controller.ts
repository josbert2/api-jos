import { Controller, Get, Param } from '@nestjs/common';
import { ComponentsService } from './components.service';

// Endpoint PUBLICO del registry — lo consume `npx shadcn add <url>`.
// Servido en la raiz como /r/:author/:name (ver el exclude del prefijo en main.ts).
// Sin guard de auth: el CLI de shadcn no se autentica.
@Controller('r')
export class RegistryController {
  constructor(private readonly service: ComponentsService) {}

  @Get(':author/:name')
  item(@Param('author') author: string, @Param('name') name: string) {
    return this.service.registryItem(author, name);
  }
}
