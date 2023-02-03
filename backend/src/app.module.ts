import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TaskSchema } from './tasks/schema/task.schema';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB),
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),

  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
