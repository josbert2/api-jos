import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import {
  CaptureDto,
  CreateCategoryDto,
  CreateResourceDto,
  UpdateCategoryDto,
  UpdateResourceDto,
} from './resources.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('resources')
export class ResourcesController {
  constructor(private readonly service: ResourcesService) {}

  // Categorías (rutas específicas declaradas antes de :id)
  @Get('categories')
  listCategories() {
    return this.service.listCategories();
  }

  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.service.createCategory(dto);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
    return this.service.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeCategory(id);
  }

  // Captura de metadata desde una URL
  @Post('capture')
  capture(@Body() dto: CaptureDto) {
    return this.service.capture(dto.url);
  }

  // Recursos
  @Get()
  list() {
    return this.service.listResources();
  }

  @Post()
  create(@Body() dto: CreateResourceDto) {
    return this.service.createResource(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateResourceDto) {
    return this.service.updateResource(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeResource(id);
  }
}
