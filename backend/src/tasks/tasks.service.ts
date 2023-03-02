import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CreateTaskDto} from './dto/create-task.dto';
import {ITask} from './tasks.interface';
import {Model} from 'mongoose';
import {UpdateTaskDto} from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private taskModel: Model<ITask>) {
    }

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
            {new: true},
        );
        if (!existingTask) {
            throw new NotFoundException(`Task #${taskId} not found`);
        }
        return existingTask;
    }

    async completeTask(
        taskId: string
    ): Promise<ITask> {
        const existingTask = await this.taskModel.findByIdAndUpdate(
            taskId,
            {
                isDone: true
            }
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

    async getTodayTasks(): Promise<ITask[]> {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const taskData = await this.taskModel.find({
            date: {
                $gte: todayStart,
                $lte: todayEnd,
            },
        });

        if (!taskData || taskData.length == 0) {
            throw new NotFoundException('Tasks not found!');
        }
        return taskData;
    }

    async getTomorrowTasks(): Promise<ITask[]> {
        const tomorrowStart = new Date();
        tomorrowStart.setDate(tomorrowStart.getDate() + 1);
        tomorrowStart.setHours(0, 0, 0, 0);
        const tomorrowEnd = new Date();
        tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);
        tomorrowEnd.setHours(23, 59, 59, 999);
        const taskData = await this.taskModel.find({
            date: {
                $gte: tomorrowStart,
                $lte: tomorrowEnd,
            },
        });
        return taskData;
    }

    async getWeeklyTasks(): Promise<ITask[]> {
        const today = new Date();
        const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        const taskData = await this.taskModel.find({
            date: {
                $gte: weekStart,
                $lte: weekEnd,
            },
        });
        return taskData;
    }

    async getMonthlyTasks(): Promise<ITask[]> {
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        monthStart.setHours(0, 0, 0, 0);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        monthEnd.setHours(23, 59, 59, 999);
        const taskData = await this.taskModel.find({
            date: {
                $gte: monthStart,
                $lte: monthEnd,
            },
        });
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
