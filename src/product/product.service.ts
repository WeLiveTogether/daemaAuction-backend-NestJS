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

  async findByCategory(categoryName: string): Promise<Array<Product>> {
    const list: Array<Product> = await this.productRepository.findByCategory(
      categoryName,
    );

    return list;
  }

  async findBySubCategory(subCategoryName: string): Promise<Array<Product>> {
    console.log(subCategoryName);

    const list: Array<Product> = await this.productRepository.findBySubCategory(
      subCategoryName,
    );

    console.log(list);

    return list;
  }
}
