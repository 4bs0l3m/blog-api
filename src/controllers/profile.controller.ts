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
import { ProfileDTO } from 'src/common/dtos/cms/profileDTO';

@Controller('profile')
export class ProfileController {
  constructor(
    private authHelper: AuthHelper,
    private service: ProfileService,
    private responseHelper: ResponseHelper,
  ) {}

  @UseGuards(AuthGuard)
  @Get('my')
  async getMyProfile(@Req() request: Request) {
    // const id = request.params.id;
    const user = <UserDTO>request.user;

    const result = await this.service.getByUserId(user.id);
    return this.responseHelper.response(result);
  }
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
  async create(@Req() request: Request, @Body() model: ProfileDTO) {
    const user = <UserDTO>request.user;
    const profile = model;
    profile.userId = user.id;
    const result = await this.service.create(profile, user.id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async update(@Req() request: Request, @Body() model: ProfileDTO) {
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
