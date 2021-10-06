import { User } from 'src/auth/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';
import { SubCategory } from 'src/category/entity/subCategory.entity';
import { BaseTimeEntity } from 'src/entities/baseTimeEntity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './productImage.entity';

@Entity()
export class Product extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  immePrice: number;

  auctionPrice: number;

  startAt: Date;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.products)
  subCategory: SubCategory;
}
