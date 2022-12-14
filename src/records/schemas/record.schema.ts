import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;
@Schema()
export class Record {
  @Prop()
  category: string;
  @Prop()
  description: string;
  @Prop()
  priceInUah: number;
  @Prop()
  userId: string;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
