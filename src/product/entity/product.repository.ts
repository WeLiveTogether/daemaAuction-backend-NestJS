import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}
