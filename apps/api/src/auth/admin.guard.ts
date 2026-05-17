import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

// Corre después de JwtAuthGuard — req.user ya viene poblado por jwt.strategy.
// Solo deja pasar a los usuarios con rol 'admin' (el CMS del portfolio es de Felipe).
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    if (req.user?.role !== 'admin') {
      throw new ForbiddenException('Solo el administrador puede acceder a esto');
    }
    return true;
  }
}
