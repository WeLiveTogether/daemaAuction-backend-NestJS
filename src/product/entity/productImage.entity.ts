import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  path: string;

  size: number;

  @ManyToOne(() => Product, (product) => product.productImages)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
