/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserDTO } from 'src/common/dtos/cms/userDTO';
import { AuthGuard } from 'src/guards/auth.guard';
import { MediaDTO } from '../common/dtos/cms/mediaDTO';

import { QueryDTO } from '../common/dtos/common/QueryDTO';
import { AuthHelper } from '../helpers/auth.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { MediaService } from '../services/media.service';

@Controller()
export class MediaController {
  constructor(
    private authHelper: AuthHelper,
    private mediaService: MediaService,
    private responseHelper: ResponseHelper,
  ) {}
  @Get('list')
  async list(@Req() request: Request, @Query() query: QueryDTO) {
    const result = await this.mediaService.findAll(query);
    return this.responseHelper.response(result.data, result.count);
  }
  @Get(':id')
  async getById(@Req() request: Request) {
    const id = request.params.id;
    const result = await this.mediaService.findById(id);
    return this.responseHelper.response(result);
  }
  @Get('key/:key')
  async getByKey(@Req() request: Request) {
    const key = request.params.key;
    const result = await this.mediaService.getByKey(key);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Req() request: Request, @Body() model: MediaDTO) {
    const user = <UserDTO>request.user;

    const result = await this.mediaService.create(model, user.id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async update(@Req() request: Request, @Body() model: MediaDTO) {
    const user = <UserDTO>request.user;

    const result = await this.mediaService.updateById(model.id, model, user.id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Get('delete/:id')
  async delete(@Req() request: Request) {
    const id = request.params.id;
    const user = <UserDTO>request.user;

    const result = await this.mediaService.deleteById(id, user.id);
    return this.responseHelper.response(result);
  }
}
