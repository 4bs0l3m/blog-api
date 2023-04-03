import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class Media extends BaseDTO {
  @Prop()
  key: string;
  @Prop()
  type: string;
  @Prop()
  url: string;
  @Prop()
  postId: string;
}
export type MediaDocument = HydratedDocument<Media>;

export const MediaSchema = SchemaFactory.createForClass(Media);

@Injectable()
export class MediaService extends ServiceBase<Media, MediaDocument> {
  constructor(@InjectModel(Media.name) private _model: Model<MediaDocument>) {
    super(_model);
  }
  getByKey(key: string) {
    return this._model
      .findOne({
        key: key,
      })
      .exec();
  }
}
