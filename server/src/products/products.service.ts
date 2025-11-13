import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    /**
     * Inject Product repository
     */
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct);
  }

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const foundProduct = await this.productRepository.findOne({
      where: { id },
    });

    if (!foundProduct) throw new NotFoundException('Product not found');

    return foundProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepository.update(
      id,
      updateProductDto,
    );
    if (!updatedProduct)
      throw new NotFoundException('Product to update not found');

    return this.findOne(id);
  }

  async remove(id: string) {
    const foundProduct = await this.findOne(id);
    if (!foundProduct) throw new NotFoundException('Product not found');

    const result = await this.productRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Product to delete not found');

    return { message: 'Delete product successfully', id };
  }
}
