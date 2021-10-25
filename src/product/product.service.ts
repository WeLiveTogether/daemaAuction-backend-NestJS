import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entity/category.entity';
import { CategoryRepository } from 'src/category/entity/category.repository';
import { SubCategory } from 'src/category/entity/subCategory.entity';
import { SubCategoryRepository } from 'src/category/entity/subCategory.repository';
import { Product } from './entity/product.entity';
import { ProductRepository } from './entity/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(SubCategoryRepository)
    private subCategoryRepository: SubCategoryRepository,
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
