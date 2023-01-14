import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { QueryDTO } from '../common/dtos/common/QueryDTO';

@Schema()
export class Post extends BaseDTO {
  @Prop()
  authorId: string;
  @Prop()
  categoryId: string;
  @Prop()
  title: string;
  @Prop()
  content: string;
}
export type PostDocument = HydratedDocument<Post>;

export const PostSchema = SchemaFactory.createForClass(Post);

@Injectable()
export class PostService extends ServiceBase<Post, PostDocument> {
  constructor(@InjectModel(Post.name) private _model: Model<PostDocument>) {
    super(_model);
  }
  async getByCategoryId(id: string, query: QueryDTO) {
    return {
      data: await this._model
        .find({ categoryId: id })
        .limit(Number(query.limit))
        .skip(Number(query.limit))
        .sort(query.orderBy)
        .exec(),
      count: await this._model.find({ categoryId: id }).count().exec(),
    };
  }
}
