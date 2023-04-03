import { JwtService } from '@nestjs/jwt';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { User, UserService } from '../services/user.service';
import { AuthHelper } from '../helpers/auth.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ProfileService } from '../services/profile.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authHelper: AuthHelper,
    private responseHelper: ResponseHelper,
    private profileService: ProfileService,
  ) {}

  @Post('login')
  async signIn(@Req() request: Request) {
    try {
      const userCred = request.body;
      if (userCred) {
        const _user = await this.userService.getUserByEmailPassword(
          userCred.email,
          userCred.password,
        );
        const access_token = this.jwtService.sign({
          id: _user.id,
          email: _user.email,
        });
        return this.responseHelper.response(access_token);
      } else {
        return this.responseHelper.error(
          'Invalid username/password!',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      return this.responseHelper.error();
    }
  }

  @Get('currentUser')
  async currentUser(@Req() request: Request) {
    try {
      const currentUser = this.authHelper.extractToken(
        request.headers.authorization,
      );
      if (currentUser) {
        const user = await this.userService.findById(currentUser.id);
        if (user) {
          return this.responseHelper.response({
            id: user.id,
            email: user.email,
            activate: user.activate,
            profile: this.profileService.getByUserId(user.id),
          });
        }
      } else {
        return this.responseHelper.error(
          'Invalid authorization!',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      return this.responseHelper.error();
    }
  }

  @Post('signup')
  async signUp(@Req() request: Request) {
    try {
      const userCred: User = request.body;
      const user = new User();
      if (userCred) {
        user.activate = true;
        user.email = userCred.email;
        user.password = userCred.password;
        const _user = await this.userService.create(user, '');
        if (_user) {
          return this.responseHelper.response(_user.id);
        }
      }
    } catch (error) {
      return this.responseHelper.error();
    }
  }
}
