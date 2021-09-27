import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { CategoryRepository } from 'src/category/entity/category.repository';
import { SubCategoryRepository } from 'src/category/entity/subCategory.repository';
import { TokenContext } from 'src/dto/tokenContext';
import { CreateProduct } from './dto/createProduct.dto';
import { Product } from './entity/product.entity';
import { ProductRepository } from './entity/product.repository';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(SubCategoryRepository)
    private subCategoryRepository: SubCategoryRepository,
  ) {}

  async create(user: TokenContext, createProduct: CreateProduct) {
    const product: Product = new Product();

    product.name = createProduct.name;
    product.immePrice = createProduct.immePrice;
    product.auctionPrice = createProduct.auctionPrice;
    product.category = await this.categoryRepository.findOneByName(
      createProduct.category,
    );
    product.subCategory = await this.subCategoryRepository.findOneByName(
      createProduct.subCategory,
    );

    const savedProduct = await this.productRepository.save(product);
  }
}
