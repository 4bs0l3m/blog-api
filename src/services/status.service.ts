import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { STATUS_TYPE } from 'src/common/const/status.const';

@Schema()
export class Status extends BaseDTO {
  @Prop()
  statu: string;
  @Prop()
  referenceId: string;
  @Prop()
  type: string;
}
export type StatusDocument = HydratedDocument<Status>;

export const StatusSchema = SchemaFactory.createForClass(Status);

@Injectable()
export class StatusService extends ServiceBase<Status, StatusDocument> {
  constructor(@InjectModel(Status.name) private _model: Model<StatusDocument>) {
    super(_model);
  }
  updatePostStatus(postId: string, userId: string, statu: string) {
    return this.updateById(
      postId,
      {
        statu: statu,
        referenceId: postId,
        type: STATUS_TYPE.POST,
      },
      userId,
    );
  }
  createPostStatus(postId: string, userId: string, statu: string) {
    return this.create(
      {
        statu: statu,
        referenceId: postId,
        type: STATUS_TYPE.POST,
      },
      userId,
    );
  }
}
