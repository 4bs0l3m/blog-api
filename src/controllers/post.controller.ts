/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PostDTO } from '../common/dtos/cms/postDTO';
import { QueryDTO } from 'src/common/dtos/common/QueryDTO';
import { PostService } from '../services/post.service';
import { Request, response } from 'express';
import { AuthHelper } from '../helpers/auth.helper';
import { ResponseHelper } from '../helpers/response.helper';

@Controller('post')
export class PostController {
  constructor(
    private authHelper: AuthHelper,
    private postService: PostService,
    private responseHelper: ResponseHelper,
  ) {}
  @Get('list')
  async list(@Req() request: Request, @Query() query: QueryDTO) {
    const result = await this.postService.findAll(query);
    return this.responseHelper.response(result.data, result.count);
  }
  @Get(':id')
  async getById(@Req() request: Request) {
    const id = request.params.id;
    const result = <PostDTO>await this.postService.findById(id);
    return this.responseHelper.response(result);
  }
  @Get('list/:categoryId')
  async listByCategoryId(@Req() request: Request, @Query() query: QueryDTO) {
    const categoryId = request.params.categoryId;
    const result = await this.postService.getByCategoryId(categoryId, query);
    return this.responseHelper.response(result.data, result.count);
  }
  @Post('create')
  async create(@Req() request: Request, @Body() model: PostDTO) {
    const user = this.authHelper.extractToken(request.headers.authorization);

    const result = await this.postService.create(model, user.id);
    return this.responseHelper.response(result);
  }
  @Post('update')
  async update(@Req() request: Request, @Body() model: PostDTO) {
    const user = this.authHelper.extractToken(request.headers.authorization);

    const result = await this.postService.updateById(model.id, model, user.id);
    return this.responseHelper.response(result);
  }
  @Get('delete/:id')
  async delete(@Req() request: Request) {
    const id = request.params.id;
    const user = this.authHelper.extractToken(request.headers.authorization);

    const result = await this.postService.deleteById(id, user.id);
    return this.responseHelper.response(result);
  }
}
