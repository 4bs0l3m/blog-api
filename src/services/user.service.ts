import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class User extends BaseDTO {
  @Prop()
  username: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  activate: boolean;
}
export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

@Injectable()
export class UserService extends ServiceBase<User, UserDocument> {
  constructor(@InjectModel(User.name) private _model: Model<UserDocument>) {
    super(_model);
  }
  getUserByEmailPassword(email, password) {
    return this._model.findOne({ email: email, password: password }).exec();
  }

  getUsers() {
    return this._model.find().exec();
  }
}
