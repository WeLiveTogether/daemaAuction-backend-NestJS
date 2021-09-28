import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  findOneByName(name: string) {
    return this.createQueryBuilder('category')
      .where('category.name = :name', { name })
      .getOne();
  }
}
