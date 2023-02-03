import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Task {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({ type: Date })
  date: Date;
  @Prop()
  isDone: boolean;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
