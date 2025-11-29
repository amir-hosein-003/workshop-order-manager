import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/new-task')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('order/:id')
  findOrderTasks(@Param('id') orderId: string) {
    return this.tasksService.findOrderTasks(orderId);
  }

  // by operator id
  @Get('operator/:id')
  findOperatorTasks(@Param('id') operatorId: string) {}

  // by operator id
  @Patch('assign/:id')
  assignTask(
    @Param('id') taskId: string,
    @Query('operatorId') operatorId: string,
  ) {
    return {
      taskId,
      operatorId,
    };
  }

  // by task id
  @Patch('status/:id')
  statusTask(@Param('id') operatorId: string) {}
}
