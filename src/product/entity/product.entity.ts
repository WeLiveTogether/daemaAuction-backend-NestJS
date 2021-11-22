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
import { ProductSaleStatus } from './productSaleStatus.enum';

@Entity()
export class Product extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: '상품 아이디', example: 5 })
  id: number;

  @Column()
  @ApiProperty({ description: '상품 이름', example: '2020년형 중고 노트북' })
  title: string;

  @Column()
  @ApiProperty({ description: '상품 내용', example: '2020년형 중고 노트북입니다. 많은 관심 부탁드립니다.' })
  content: string;

  @Column({ name: 'imme_price' })
  @ApiProperty({ description: '즉시 판매가', example: 3000000 })
  immePrice: number;

  @Column({ name: 'auction_price' })
  @ApiProperty({ description: '경매 판매가', example: 2500000 })
  auctionPrice: number;

  @Column({ name: 'image_url'})
  @ApiProperty({ description: '이미지 url', example: 'https://w.namu.la/s/ad786060df058256c8f742dceef224cefe58a35be6ecc1c8671cbeb5b43a4b6e5efdfe3fe3faf9073100088e2584eb2b570d43e7b7428c4b34c9c71f6d9818ae81e5793b6830a8e71fefa050191c92b3'})
  imageUrl: string;

  @Column({ name: 'sale_status' })
  @ApiProperty({ description: '판매 상태', example: 'SOLD_OUT'})
  saleStatus: ProductSaleStatus;

  @Column({ name: 'create_date' })
  @ApiProperty({ description: '시작 시간' })
  createDate: Date;

  @Column()
  @ApiProperty({ description: '방문 횟수', example: 2 })
  views: number;

  @Column({ name: 'consumer_id' })
  @ApiProperty({ description: '구매자 아이디', example: 5 })
  consumerId: number;

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
