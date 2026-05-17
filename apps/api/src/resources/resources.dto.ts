import { IsArray, IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString() @MaxLength(120) name!: string;
  @IsString() @MaxLength(120) slug!: string;
  @IsOptional() @IsString() @MaxLength(32) color?: string;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsOptional() @IsString() @MaxLength(120) declare name: string;
  @IsOptional() @IsString() @MaxLength(120) declare slug: string;
}

export class CreateResourceDto {
  @IsString() @MaxLength(1000) url!: string;
  @IsString() @MaxLength(300) title!: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() @MaxLength(1000) thumbnail?: string;
  @IsOptional() @IsString() @MaxLength(1000) favicon?: string;
  @IsOptional() @IsArray() tags?: string[];
  @IsOptional() @IsInt() categoryId?: number | null;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsBoolean() isFavorite?: boolean;
  @IsOptional() @IsInt() order?: number;
}

export class UpdateResourceDto extends CreateResourceDto {
  @IsOptional() @IsString() @MaxLength(1000) declare url: string;
  @IsOptional() @IsString() @MaxLength(300) declare title: string;
}

export class CaptureDto {
  @IsString() url!: string;
}
