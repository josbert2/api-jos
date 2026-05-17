import { Module } from '@nestjs/common';
import { ComponentsController } from './components.controller';
import { RegistryController } from './registry.controller';
import { ComponentsService } from './components.service';

@Module({
  controllers: [ComponentsController, RegistryController],
  providers: [ComponentsService],
})
export class ComponentsModule {}
