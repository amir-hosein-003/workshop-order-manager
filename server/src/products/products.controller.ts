import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role-guard/role.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/role/roles.decorator';

@Controller('products')
@UseGuards(JwtAuthGuard, RoleGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('new-product')
  @Roles(Role.Admin)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Admin)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Admin)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
