import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './db/drizzle.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { SkillsModule } from './skills/skills.module';
import { ContactModule } from './contact/contact.module';
import { UploadModule } from './upload/upload.module';
import { ResourcesModule } from './resources/resources.module';
import { ComponentsModule } from './components/components.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env'],
    }),
    DrizzleModule,
    AuthModule,
    ProjectsModule,
    ExperiencesModule,
    SkillsModule,
    ContactModule,
    UploadModule,
    ResourcesModule,
    ComponentsModule,
  ],
})
export class AppModule {}
