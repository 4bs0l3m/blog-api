/*
https://docs.nestjs.com/controllers#controllers
*/
import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { UserDTO } from 'src/common/dtos/cms/userDTO';
import { QueryDTO } from 'src/common/dtos/common/QueryDTO';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthHelper } from 'src/helpers/auth.helper';
import { ResponseHelper } from 'src/helpers/response.helper';
import { ProfileService } from 'src/services/profile.service';
import { Request } from 'express';
import { MediaService } from 'src/services/media.service';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private authHelper: AuthHelper,
    private mediaService: MediaService,
    private service: UserService,
    private responseHelper: ResponseHelper,
  ) {}

  @UseGuards(AuthGuard)
  @Get('list')
  async list(@Req() request: Request, @Query() query: QueryDTO) {
    const result = await this.service.findAll(query);
    return this.responseHelper.response(result.data, result.count);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Req() request: Request) {
    const id = request.params.id;
    const result = await this.service.findById(id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Req() request: Request, @Body() model: UserDTO) {
    const user = <UserDTO>request.user;
    const result = await this.service.create(model, user.id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async update(@Req() request: Request, @Body() model: UserDTO) {
    const user = <UserDTO>request.user;
    const result = await this.service.updateById(model.id, model, user.id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Get('delete/:id')
  async delete(@Req() request: Request) {
    const id = request.params.id;
    const user = <UserDTO>request.user;
    const result = await this.service.deleteById(id, user.id);
    return this.responseHelper.response(result);
  }
}
