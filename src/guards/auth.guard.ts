import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthHelper } from 'src/helpers/auth.helper';
import { Request } from 'express';
import { TokenDTO } from 'src/common/dtos/common/TokenDTO';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authHelper: AuthHelper,
    private userService: UserService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token: TokenDTO = this.authHelper.extractToken(
      request.headers.authorization,
    );

    return this.checkUser(request, token.userId);
  }
  async checkUser(request, userId) {
    const user = await this.userService.findById(userId);
    if (user && user.id) {
      request.user = user;
      return true;
    }

    return false;
  }
}
