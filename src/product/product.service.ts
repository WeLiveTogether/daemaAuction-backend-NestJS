import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { ProductRepository } from './entity/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async findByCategory(categoryName: string): Promise<Product[]> {
    return this.productRepository.findByCategory(categoryName);
  }

  async findBySubCategory(subCategoryName: string): Promise<Product[]> {
    return this.productRepository.findBySubCategory(subCategoryName);
  }
}
