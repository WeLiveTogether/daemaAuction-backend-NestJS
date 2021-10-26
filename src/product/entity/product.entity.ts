import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: '상품 아이디' })
  id: number;

  @Column()
  @ApiProperty({ description: '상품 이름' })
  name: string;

  @Column({ name: 'imme_price' })
  @ApiProperty({ description: '즉시 판매가' })
  immePrice: number;

  @Column({ name: 'auction_price' })
  @ApiProperty({ description: '경매 판매가' })
  auctionPrice: number;

  @Column({ name: 'start_at' })
  @ApiProperty({ description: '시작 시간' })
  startAt: Date;

  @Column()
  @ApiProperty({ description: '방문 횟수' })
  views: number;

  @Column({ name: 'user_id' })
  @ApiProperty({ description: '상품 올린 유저 아이디' })
  userId: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @Column({ name: 'category_id' })
  @ApiProperty({ description: '카테고리 아이디' })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'sub_category_id' })
  @ApiProperty({ description: '부 카테고리 아이디' })
  subCategoryId: number;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.products)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;
}
