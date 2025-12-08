import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { OrderService } from 'src/order/order.service';
import { UsersService } from 'src/users/users.service';
import { Order } from 'src/order/entities/order.entity';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Task), useValue: {} },
        { provide: getRepositoryToken(Order), useValue: {} },
        { provide: OrderService, useValue: {} },
        { provide: UsersService, useValue: {} },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
