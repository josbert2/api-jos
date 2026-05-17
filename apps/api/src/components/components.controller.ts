import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto, UpdateComponentDto } from './components.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('components')
export class ComponentsController {
  constructor(private readonly service: ComponentsService) {}

  @Get()
  list(@Req() req: any) {
    return this.service.findAll(req.user.id);
  }

  @Get(':id')
  byId(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.service.findOwned(id, req.user.id);
  }

  @Post()
  create(@Body() dto: CreateComponentDto, @Req() req: any) {
    return this.service.create(dto, req.user.id, req.user.username || 'josbert');
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateComponentDto,
    @Req() req: any,
  ) {
    return this.service.update(id, dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.service.remove(id, req.user.id);
  }
}
