import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Device extends Document {
  @Prop({ required: true, unique: true })
  deviceId: string;

  @Prop({ required: true })
  authKey: string;

  @Prop()
  version: string;

  @Prop()
  temperature: string;

  @Prop()
  authDate: Date;

  @Prop()
  createdAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
