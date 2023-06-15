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
    return await this._model
      .find({ categoryId: id })
      .limit(Number(query.limit))
      .skip(Number(query.limit))
      .sort(query.orderBy);
  }
  async getPostList(query: QueryDTO) {
    const result = await this._model
      .aggregate([
        {
          $lookup: {
            from: 'profiles',
            localField: 'authorId',
            foreignField: 'userId',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: 'id',
            as: 'category',
          },
        },
      ])
      .exec();
    return result.map((item) => {
      const reVal = item;
      reVal['user'] = item['user'][0];
      reVal['category'] = item['category'][0];
      return reVal;
    });
  }
  async getTopPostByUserId(userId: string) {
    const result = await this._model
      .find({ authorId: userId })
      .limit(Number(10))
      .skip(Number(0))
      .sort()
      .exec();

    return result;
  }
}
