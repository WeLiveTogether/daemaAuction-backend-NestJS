import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SubCategory } from './subCategory.entity';

@Injectable()
@EntityRepository(SubCategory)
export class SubCategoryRepository extends Repository<SubCategory> {
  findOneByName(name: string) {
    return this.createQueryBuilder('category')
      .where('category.name = :name', { name })
      .getOne();
  }
}
