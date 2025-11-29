import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
    private readonly orderService: OrderService,
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

    return await this.tasksRepository.find({
      where: { order: { id: order.id } },
    });
  }

}
