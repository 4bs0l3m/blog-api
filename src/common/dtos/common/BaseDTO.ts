import { Prop } from '@nestjs/mongoose';

export class BaseDTO {
  @Prop()
  id: string;
  @Prop()
  code?: string;
  @Prop({ type: Object })
  metadata?: {
    createdTime?: Date;
    modifiedTime?: Date;
    createdBy?: string;
    modifiedBy?: string;
    active?: number;
  };
}
