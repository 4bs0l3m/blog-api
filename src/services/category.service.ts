import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class Category extends BaseDTO {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  parentCategoryId: string;
}
export type CategoryDocument = HydratedDocument<Category>;

export const CategorySchema = SchemaFactory.createForClass(Category);

@Injectable()
export class CategoryService extends ServiceBase<Category, CategoryDocument> {
  constructor(
    @InjectModel(Category.name) private _model: Model<CategoryDocument>,
  ) {
    super(_model);
  }
}
