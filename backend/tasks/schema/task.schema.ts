import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Task {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  date: string;
  @Prop()
  isDone: boolean;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
