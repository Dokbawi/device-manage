import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Device extends Document {
  @Prop({ required: true, unique: true })
  deviceId: string;

  @Prop({ required: true })
  authKey: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
