import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { SubCategory } from './subCategory.entity';

@Injectable()
@EntityRepository(SubCategory)
export class SubCategoryRepository extends Repository<SubCategory> {
  findByName(name: string) {
    return this.createQueryBuilder('subCategory')
      .where('subCategory.name = :name', { name })
      .getOne();
  }
}
