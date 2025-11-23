import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/entities/user.entity';
import { PartialType } from '@nestjs/swagger';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly productService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto, id: string) {
    const product = await this.productService.findOne(createOrderDto.productId);

    if (!product) throw new BadRequestException();

    const { productId, createdBy, ...orderData } = createOrderDto;

    const newOrder = this.orderRepository.create({
      product: product,
      createdBy: { id },
      ...orderData,
    });

    return await this.orderRepository.save(newOrder);
  }

  async findAll() {
    try {
      const orders = await this.orderRepository.find();
      const cleanOrders = orders.map((order) => {
        if (!order.createdBy) return order;
        const { password, createdAt, updatedAt, ...data } = order.createdBy;

        return {
          ...order,
          createdBy: { ...data },
        };
      });
      return cleanOrders;
    } catch {
      throw new RequestTimeoutException();
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
