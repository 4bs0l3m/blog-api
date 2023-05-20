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
import { CommentService } from 'src/services/comment.service';
import { Request } from 'express';
import { CommentDTO } from 'src/common/dtos/cms/commentDTO';

@Controller('comment')
export class CommentController {
  constructor(
    private authHelper: AuthHelper,
    private service: CommentService,
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
  async create(@Req() request: Request, @Body() model: CommentDTO) {
    const user = <UserDTO>request.user;
    const result = await this.service.create(model, user.id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async update(@Req() request: Request, @Body() model: CommentDTO) {
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
