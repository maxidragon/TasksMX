import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITask } from './tasks.interface';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private taskModel: Model<ITask>) {}
  async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = await new this.taskModel(createTaskDto);
    return newTask.save();
  }
  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ITask> {
    const existingTask = await this.taskModel.findByIdAndUpdate(
      taskId,
      updateTaskDto,
      { new: true },
    );
    if (!existingTask) {
      throw new NotFoundException(`Task #${taskId} not found`);
    }
    return existingTask;
  }
  async getAllTasks(): Promise<ITask[]> {
    const taskData = await this.taskModel.find();
    if (!taskData || taskData.length == 0) {
      throw new NotFoundException('Tasks not found!');
    }
    return taskData;
  }
  async getTask(taskId: string): Promise<ITask> {
    const existingTask = await this.taskModel.findById(taskId).exec();
    if (!existingTask) {
      throw new NotFoundException(`Task #${taskId} not found`);
    }
    return existingTask;
  }
  async deleteTask(taskId: string): Promise<ITask> {
    const deletedTask = await this.taskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new NotFoundException(`Task #${taskId} not found`);
    }
    return deletedTask;
  }
}
