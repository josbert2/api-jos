import { IsArray, IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class RegistryFileDto {
  path!: string;
  content!: string;
  type!: string;
}

export class CreateComponentDto {
  @IsString() @MaxLength(160) name!: string;
  @IsOptional() @IsString() @MaxLength(80) author?: string;
  @IsString() @MaxLength(200) title!: string;
  @IsOptional() @IsString() @MaxLength(500) description?: string;
  @IsOptional() @IsString() @MaxLength(60) type?: string;
  @IsOptional() @IsArray() dependencies?: string[];
  @IsOptional() @IsArray() registryDependencies?: string[];
  @IsArray() files!: RegistryFileDto[];
  @IsOptional() @IsString() demo?: string;
  @IsOptional() @IsArray() tags?: string[];
  @IsOptional() @IsString() @MaxLength(1000) preview?: string;
  @IsOptional() @IsBoolean() isPublished?: boolean;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateComponentDto extends CreateComponentDto {
  @IsOptional() @IsString() @MaxLength(160) declare name: string;
  @IsOptional() @IsString() @MaxLength(200) declare title: string;
  @IsOptional() @IsArray() declare files: RegistryFileDto[];
}
