import { JwtService } from '@nestjs/jwt';
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { User, UserService } from '../services/user.service';
import { AuthHelper } from '../helpers/auth.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { ProfileService } from '../services/profile.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDTO } from 'src/common/dtos/cms/userDTO';

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
          userId: _user.id,
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
  @UseGuards(AuthGuard)
  @Get('currentUser')
  async currentUser(@Req() request: Request) {
    try {
      const user = <UserDTO>request.user;
      if (user) {
        return this.responseHelper.response({
          id: user.id,
          email: user.email,
          activate: user.activate,
          profile: await this.profileService.getByUserId(user.id),
        });
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
        user.username = userCred.username;
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
