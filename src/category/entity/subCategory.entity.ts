import { Product } from 'src/product/entity/product.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  @ManyToOne(() => Category, (category) => category.categories)
  category: Category;

  @OneToMany(() => Product, (product) => product.subCategory)
  products: Product[];
}
