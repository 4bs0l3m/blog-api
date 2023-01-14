import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class Profile extends BaseDTO {
  @Prop()
  userId: string;
  @Prop()
  fullname: string;
  @Prop()
  profilPicture: string;
  @Prop()
  birhdate: string;
  @Prop()
  bio: string;
}
export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);

@Injectable()
export class ProfileService extends ServiceBase<Profile, ProfileDocument> {
  constructor(
    @InjectModel(Profile.name) private _model: Model<ProfileDocument>,
  ) {
    super(_model);
  }
  getByUserId(id: string) {
    return this._model.findOne({ id: id }).exec();
  }
}
