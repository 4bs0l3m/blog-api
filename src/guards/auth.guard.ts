import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthHelper } from 'src/helpers/auth.helper';
import { Request } from 'express';
import { TokenDTO } from 'src/common/dtos/common/TokenDTO';
import { UserService } from 'src/services/user.service';
import { UserDTO } from 'src/common/dtos/cms/userDTO';

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
    if (token) {
      return this.checkUser(request, token.userId);
    } else {
      return false;
    }
  }
  async checkUser(request, userId) {
    const user: any = await this.userService.findById(userId);
    if (user && user.id && user.activate) {
      request.user = user;
      return true;
    }

    return false;
  }
}
