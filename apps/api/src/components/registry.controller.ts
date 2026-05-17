import { Controller, Get, Param } from '@nestjs/common';
import { ComponentsService } from './components.service';

// Endpoint PUBLICO del registry — lo consume `npx shadcn add <url>`.
// Sin guard de auth: el CLI de shadcn no se autentica.
@Controller('r')
export class RegistryController {
  constructor(private readonly service: ComponentsService) {}

  @Get(':name')
  item(@Param('name') name: string) {
    return this.service.registryItem(name);
  }
}
