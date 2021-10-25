import { User } from 'src/auth/entity/user.entity';
import { Category } from 'src/category/entity/category.entity';
import { SubCategory } from 'src/category/entity/subCategory.entity';
import { BaseTimeEntity } from 'src/entities/baseTimeEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductImage } from './productImage.entity';

@Entity()
export class Product extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'imme_price' })
  immePrice: number;

  @Column({ name: 'auction_price' })
  auctionPrice: number;

  @Column({ name: 'start_at' })
  startAt: Date;

  @Column()
  views: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'sub_category_id' })
  subCategoryId: number;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.products)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;
}
