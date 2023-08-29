/* eslint-disable prettier/prettier */
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
import { PostDTO } from '../common/dtos/cms/postDTO';
import { QueryDTO } from 'src/common/dtos/common/QueryDTO';
import { PostService } from '../services/post.service';
import { Request } from 'express';
import { AuthHelper } from '../helpers/auth.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDTO } from 'src/common/dtos/cms/userDTO';
import { MediaService } from 'src/services/media.service';
import { StatusService } from 'src/services/status.service';
import { POST_STATUS_KEYS } from 'src/common/const/status.const';
import { CommentService } from 'src/services/comment.service';

@Controller('post')
export class PostController {
  constructor(
    private authHelper: AuthHelper,
    private postService: PostService,
    private commentService:CommentService,
    private mediaService: MediaService,
    private responseHelper: ResponseHelper,
    private statusService: StatusService,
  ) {}
  @Get('list')
  async list(@Req() request: Request, @Query() query: QueryDTO) {
    const result = await this.postService.getPostList(query);
    const count = await this.postService.getCount();

    return this.responseHelper.response(result, count);
  }
  @Get('comments/:id')
  async getComments(@Req() request: Request, @Query() query: QueryDTO) {
    const result = await this.commentService.findById(request["id"]);

    return this.responseHelper.response(result);
  }
  @Get(':id')
  async getById(@Req() request: Request) {
    const id = request.params.id;

    const result = await this.postService.findById(id);
    return this.responseHelper.response(result);
  }
  @Get('getTopPostByUserId/:id')
  async getTopPostByUserId(@Req() request: Request) {
    const id = request.params.id;

    const result = await this.postService.getTopPostByUserId(id);
    return this.responseHelper.response(result);
  }

  @Get('feature/:id')
  async getPostFeature(@Req() request: Request) {
    const id = request.params.id;

    const result = await this.mediaService.getPostFeatureByPostId(id);
    return this.responseHelper.response(result);
  }
  @Get('list/:categoryId')
  async listByCategoryId(@Req() request: Request, @Query() query: QueryDTO) {
    const categoryId = request.params.categoryId;

    const result = await this.postService.getByCategoryId(categoryId, query);
    return this.responseHelper.response(result, 0);
  }

  @UseGuards(AuthGuard)
  @Get('setStatus/:id/:status')
  async setStatus(@Req() request: Request, @Body() model: PostDTO) {
    const user = <UserDTO>request.user;
    
    if(request['id'] && request['status']){

      const model = await this.postService.findById(request['id']);
      
      const result =this.statusService.createPostStatus(
        model.id,
        user.id,
        request['status'],
        );
        return this.responseHelper.response(result);
      }
  }
  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Req() request: Request, @Body() model: PostDTO) {
    const user = <UserDTO>request.user;
    model.authorId = user.id;
    const result = await this.postService.create(model, user.id);
    this.statusService.createPostStatus(
      result.id,
      user.id,
      POST_STATUS_KEYS.DRAFT,
    );
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async update(@Req() request: Request, @Body() model: PostDTO) {
    const user = <UserDTO>request.user;
    model.authorId = user.id;

    const result = await this.postService.updateById(model.id, model, user.id);
    return this.responseHelper.response(result);
  }

  @UseGuards(AuthGuard)
  @Get('delete/:id')
  async delete(@Req() request: Request) {
    const id = request.params.id;
    const user = <UserDTO>request.user;

    const result = await this.postService.deleteById(id, user.id);
    return this.responseHelper.response(result);
  }
}
