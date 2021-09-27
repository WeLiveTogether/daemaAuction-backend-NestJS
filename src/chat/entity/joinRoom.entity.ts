import { User } from 'src/auth/entity/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class JoinRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.joinRooms)
  user: User;

  @ManyToOne(() => Room, (room) => room.joinRooms)
  room: Room;
}
