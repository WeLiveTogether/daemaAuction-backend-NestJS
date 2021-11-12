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
  @ApiProperty({ description: '상품 아이디', example: 5 })
  id: number;

  @Column()
  @ApiProperty({ description: '상품 이름', example: '2020년형 중고 노트북' })
  name: string;

  @Column({ name: 'imme_price' })
  @ApiProperty({ description: '즉시 판매가', example: 3000000 })
  immePrice: number;

  @Column({ name: 'auction_price' })
  @ApiProperty({ description: '경매 판매가', example: 2500000 })
  auctionPrice: number;

  @Column({ name: 'start_at' })
  @ApiProperty({ description: '시작 시간' })
  startAt: Date;

  @Column()
  @ApiProperty({ description: '방문 횟수', example: 2 })
  views: number;

  @Column({ name: 'customer_id' })
  @ApiProperty({ description: '구매자 아이디', example: 5 })
  customerId: number;

  @Column({ name: 'user_id' })
  @ApiProperty({ description: '상품 올린 유저 아이디', example: 5 })
  userId: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImages: ProductImage[];

  @Column({ name: 'category_id' })
  @ApiProperty({ description: '카테고리 아이디', example: 2 })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'sub_category_id' })
  @ApiProperty({ description: '부 카테고리 아이디', example: 3 })
  subCategoryId: number;

  @ManyToOne(() => SubCategory, (subcategory) => subcategory.products)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;
}
