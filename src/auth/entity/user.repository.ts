import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findById(id: number) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }
}
