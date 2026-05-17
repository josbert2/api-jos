import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

// Endpoints públicos de usuario — sin autenticación.
@Controller('users')
export class UsersController {
  constructor(private readonly auth: AuthService) {}

  @Get(':username')
  profile(@Param('username') username: string) {
    return this.auth.publicProfile(username);
  }
}
