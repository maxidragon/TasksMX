import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
} from '@nestjs/common';
import {CreateTaskDto} from './dto/create-task.dto';
import {UpdateTaskDto} from './dto/update-task.dto';
import {TasksService} from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {
    }

    @Get()
    async getAllTasks(@Res() response) {
        try {
            const data = await this.tasksService.getAllTasks();
            return response.status(HttpStatus.OK).json(data);
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/today')
    async getTodayTasks(@Res() response) {
        try {
            const data = await this.tasksService.getTodayTasks();
            return response.status(HttpStatus.OK).json(data);
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/tomorrow')
    async getTomorrowTasks(@Res() response) {
        try {
            const data = await this.tasksService.getTomorrowTasks();
            return response.status(HttpStatus.OK).json(data);
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/weekly')
    async getWeeklyTasks(@Res() response) {
        try {
            const data = await this.tasksService.getWeeklyTasks();
            return response.status(HttpStatus.OK).json(data);
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/monthly')
    async getMonthlyTasks(@Res() response) {
        try {
            const data = await this.tasksService.getMonthlyTasks();
            return response.status(HttpStatus.OK).json(data);
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getTask(@Res() response, @Param('id') taskId: string) {
        try {
            const existingTask = await this.tasksService.getTask(taskId);
            return response.status(HttpStatus.OK).json({
                message: 'Task found successfully',
                existingTask,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    //TODO
    //Complete task
    @Post()
    async createTask(@Res() response, @Body() createTaskDto: CreateTaskDto) {
        try {
            const newTask = await this.tasksService.createTask(createTaskDto);
            return response.status(HttpStatus.CREATED).json(newTask);
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Task not created!',
                error: 'Bad Request',
            });
        }
    }

    @Put('/:id')
    async updateStudent(
        @Res() response,
        @Param('id') taskId: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        try {
            const existingTask = await this.tasksService.updateTask(
                taskId,
                updateTaskDto,
            );
            return response.status(HttpStatus.OK).json({
                message: 'Task has been successfully updated',
                existingTask,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteTask(@Res() response, @Param('id') taskId: string) {
        try {
            const deletedTask = await this.tasksService.deleteTask(taskId);
            return response.status(HttpStatus.OK).json({
                message: 'Task deleted successfully',
                deletedTask,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
