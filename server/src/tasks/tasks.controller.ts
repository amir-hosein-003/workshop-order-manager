import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role-guard/role.guard';
import { Roles } from 'src/common/decorators/role/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RoleGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/new-task')
  @Roles(Role.Admin)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('order/:id')
  @Roles(Role.Admin, Role.Admin)
  findOrderTasks(@Param('id') orderId: string) {
    return this.tasksService.findOrderTasks(orderId);
  }

  // by operator id
  @Get('operator/:id')
  @Roles(Role.Admin, Role.Admin)
  findOperatorTasks(@Param('id') operatorId: string) {
    return this.tasksService.findOperatorTasks(operatorId);
  }

  // by operator id
  @Patch('assign/:id')
  @Roles(Role.Admin, Role.Admin)
  taskAssign(
    @Param('id') taskId: string,
    @Query('operatorId') operatorId: string,
  ) {
    return this.tasksService.taskAssign(taskId, operatorId);
  }

  // by task id
  @Patch('status/:id')
  @Roles(Role.Admin, Role.Admin)
  taskStatus(@Param('id') taskId: string, @Body() body: UpdateTaskDto) {
    return this.tasksService.taskStatus(taskId, body);
  }
}
