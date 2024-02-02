import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { QueryDTO } from 'src/common/dtos/common/QueryDTO';

@Schema()
export class Comment extends BaseDTO {
  @Prop()
  postId: string;
  @Prop()
  parentId: string;
  @Prop()
  userId: string;
  @Prop()
  text: string;
}
export type CommentDocument = HydratedDocument<Comment>;

export const CommentSchema = SchemaFactory.createForClass(Comment);

@Injectable()
export class CommentService extends ServiceBase<Comment, CommentDocument> {
  constructor(
    @InjectModel(Comment.name) private _model: Model<CommentDocument>,
  ) {
    super(_model);
  }
  getCommentsByPostId(postId:number,query:QueryDTO){
   return this._model.find({postId:postId})
    .limit(Number(query.limit))
    .skip(Number(query.skip))
    .exec();
  }
}
