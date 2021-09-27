import { User } from 'src/auth/entity/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  writer: string;

  context: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;
}
