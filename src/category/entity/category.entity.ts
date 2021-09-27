import { Product } from 'src/product/entity/product.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubCategory } from './subCategory.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => SubCategory, (subCategory) => subCategory.category)
  categories: SubCategory[];
}
