import { JoinRoom } from 'src/chat/entity/joinRoom.entity';
import { Message } from 'src/chat/entity/Message.entity';
import { Product } from 'src/product/entity/product.entity';
import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  name: string;

  gcn: number;

  email: string;

  @CreateDateColumn()
  created_date: Date;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => JoinRoom, (joinRoom) => joinRoom.user)
  joinRooms: JoinRoom[];
}
