import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RoleGuard } from 'src/common/guards/role-guard/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role/roles.decorator';
import { Role } from 'src/common/enums/role.enum';

@Controller('orders')
@UseGuards(JwtAuthGuard, RoleGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/new-order')
  @Roles(Role.Admin)
  create(@Req() req, @Body() createOrderDto: CreateOrderDto) {
    const user = req?.user;
    return this.orderService.create(createOrderDto, user?.id);
  }

  @Get()
  @Roles(Role.Admin, Role.Operator)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Operator)
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
