import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { OrderService } from 'src/order/order.service';
import { UsersService } from 'src/users/users.service';
import { Order } from 'src/order/entities/order.entity';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        { provide: getRepositoryToken(Task), useValue: {} }, // فقط Repo که سرویس نیاز دارد
        { provide: getRepositoryToken(Order), useValue: {} }, // فقط Repo که سرویس نیاز دارد
        { provide: OrderService, useValue: {} },             // mock service
        { provide: UsersService, useValue: {} },             // mock service
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
