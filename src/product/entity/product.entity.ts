import { User } from 'src/auth/entity/user.entity';
import { Category } from 'src/category/entity/Category.entity';
import { SubCategory } from 'src/category/entity/subCategory.entity';
import { BaseTimeEntity } from 'src/entities/baseTimeEntity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  immePrice: number;

  auctionPrice: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.products)
  subCategory: SubCategory;
}
