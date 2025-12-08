import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';
import { UsersService } from 'src/users/users.service';

enum Status {
  pending = 'pending',
  in_progress = 'in_progress',
  completed = 'completed',
}

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    private readonly orderService: OrderService,
    private readonly usersService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const order = await this.orderService.findOne(createTaskDto.orderId);

    if (!order) throw new NotFoundException();

    const { orderId, ...taskData } = createTaskDto;

    const newTask = this.tasksRepository.create({
      order: order,
      ...taskData,
    });

    return await this.tasksRepository.save(newTask);
  }

  async findOrderTasks(orderId: string) {
    const order = await this.orderService.findOne(orderId);

    if (!order) throw new NotFoundException('Order not found');

    const tasks = await this.tasksRepository.find({
      where: { order: { id: order.id } },
    });

    const cleanTasks = tasks.map((task) => {
      if (!task.assignedTo) return task;
      const { password, createdAt, updatedAt, ...data } = task.assignedTo;
      return {
        ...task,
        assignedTo: data,
      };
    });

    return cleanTasks;
  }

  async findOperatorTasks(operatorId: string) {
    const operatorTasks = await this.tasksRepository.find({
      where: { assignedTo: { id: operatorId } },
    });

    const cleanTasks = operatorTasks.map((task) => {
      if (!task.assignedTo) return task;
      const { password, createdAt, updatedAt, ...data } = task.assignedTo;
      return {
        ...task,
        assignedTo: data,
      };
    });

    return cleanTasks;
  }

  async findOne(id: string) {
    return await this.tasksRepository.findOne({ where: { id } });
  }

  async taskAssign(taskId: string, operatorId: string) {
    const task = await this.findOne(taskId);
    const operator = await this.usersService.findById(operatorId);

    if (!task) throw new NotFoundException();
    if (!operator) throw new NotFoundException();

    const { password, createdAt, updatedAt, ...data } = operator;

    await this.tasksRepository.update(taskId, {
      assignedTo: data,
    });

    return { message: `assigned to ${operator.name} successfully` };
  }

  // update task status
  async taskStatus(taskId: string, body: UpdateTaskDto) {
    const task = await this.findOne(taskId);

    if (!task) throw new NotFoundException('Task not found');

    const validStatuses = ['pending', 'in_progress', 'completed'] as const;

    if (!validStatuses.includes(body.status as Status)) {
      throw new BadRequestException('Invalid task status');
    }

    if (task.status === body.status) {
      throw new BadRequestException(
        `The selected status is the same as the current status ('${task.status}')`,
      );
    }

    const updatedTask = await this.tasksRepository.save({
      ...task,
      status: body.status,
    });

    return {
      message: `change task status from ${task.status} to ${updatedTask?.status} successfully`,
    };
  }
}
