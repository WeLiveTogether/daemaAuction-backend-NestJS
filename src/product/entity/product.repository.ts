import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  findByCategory(category_name: string) {
    return this.createQueryBuilder('product')
      .innerJoinAndSelect('product.user', 'user')
      .innerJoinAndSelect('product.category', 'category')
      .innerJoinAndSelect('product.subCategory', 'subCategory')
      .select([
        'product.id',
        'product.name',
        'product.immePrice',
        'product.auctionPrice',
        'product.startAt',
        'product.views',
        'product.createdDate',
        'product.modifiedDate',
        'user.username',
        'category.name',
        'subCategory.name',
      ])
      .where('category.name = :category_name', { category_name })
      .getMany();
  }

  findBySubCategory(subCategory_name: string) {
    return this.createQueryBuilder('product')
      .innerJoinAndSelect('product.user', 'user')
      .innerJoinAndSelect('product.category', 'category')
      .innerJoinAndSelect('product.subCategory', 'subCategory')
      .select([
        'product.id',
        'product.name',
        'product.immePrice',
        'product.auctionPrice',
        'product.startAt',
        'product.views',
        'product.createdDate',
        'product.modifiedDate',
        'user.username',
        'category.name',
        'subCategory.name',
      ])
      .where('subCategory.name = :subCategory_name', { subCategory_name })
      .getMany();
  }
}
