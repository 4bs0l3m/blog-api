import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CategoryDTO } from '../common/dtos/cms/categoryDTO';
import { QueryDTO } from '../common/dtos/common/QueryDTO';
import { AuthHelper } from '../helpers/auth.helper';
import { ResponseHelper } from '../helpers/response.helper';
import { CategoryService } from '../services/category.service';
import { Request } from 'express';

@Controller('category')
export class CategoryController {
  constructor(
    private authHelper: AuthHelper,
    private categoryService: CategoryService,
    private responseHelper: ResponseHelper,
  ) {}
  @Get('list')
  async list(@Req() request: Request, @Query() query: QueryDTO) {
    const result = await this.categoryService.findAll(query);
    return this.responseHelper.response(result.data, result.count);
  }
  @Get(':id')
  async getById(@Req() request: Request) {
    const id = request.params.id;
    const result = await this.categoryService.findById(id);
    return this.responseHelper.response(result);
  }
  @Post('create')
  async create(@Req() request: Request, @Body() model: CategoryDTO) {
    const user = this.authHelper.extractToken(request.headers.authorization);

    const result = await this.categoryService.create(model, user.id);
    return this.responseHelper.response(result);
  }
  @Post('update')
  async update(@Req() request: Request, @Body() model: CategoryDTO) {
    const user = this.authHelper.extractToken(request.headers.authorization);

    const result = await this.categoryService.updateById(
      model.id,
      model,
      user.id,
    );
    return this.responseHelper.response(result);
  }
  @Get('delete/:id')
  async delete(@Req() request: Request) {
    const id = request.params.id;
    const user = this.authHelper.extractToken(request.headers.authorization);

    const result = await this.categoryService.deleteById(id, user.id);
    return this.responseHelper.response(result);
  }
}
