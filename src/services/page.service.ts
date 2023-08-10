import { ServiceBase } from '../common/abstracts/ServiceBase';
import { BaseDTO } from '../common/dtos/common/BaseDTO';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Schema()
export class Page extends BaseDTO {
  @Prop()
  name: string;
  @Prop()
  code: string;
  @Prop()
  type: string;
}
export type PageDocument = HydratedDocument<Page>;

export const PageSchema = SchemaFactory.createForClass(Page);

@Injectable()
export class PageService extends ServiceBase<Page, PageDocument> {
  constructor(@InjectModel(Page.name) private _model: Model<PageDocument>) {
    super(_model);
  }
}
