import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class RefreshGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies?.refresh_token;
    if (!token) return false;
    request.refreshToken = token;
    return true;
  }
}