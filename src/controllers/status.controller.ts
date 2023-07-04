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
import { ResponseHelper } from 'src/helpers/response.helper';
import { Request } from 'express';
import { StatusService } from 'src/services/status.service';
import { StatusDTO } from 'src/common/dtos/cms/statusDTO';

@Controller("status")
export class StatusController {
  constructor(
    private service: StatusService,
    private responseHelper: ResponseHelper,
  ) {}

  @Get('list')
  async list(@Req() request: Request, @Query() query: QueryDTO) {
    const result = await this.service.findAll(query);
    return this.responseHelper.response(result.data, result.count);
  }

  @Get(':id')
  async getById(@Req() request: Request) {
    const id = request.params.id;
    const result = await this.service.findById(id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Req() request: Request, @Body() model: StatusDTO) {
    const user = <UserDTO>request.user;
    const result = await this.service.create(model, user.id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async update(@Req() request: Request, @Body() model: StatusDTO) {
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
