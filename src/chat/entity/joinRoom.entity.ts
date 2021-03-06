import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class JoinRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number

  @Column({ name: 'room_id' })
  roomId: number

  @ManyToOne(() => User, (user) => user.joinRooms)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userSeq'})
  user: User;

  @ManyToOne(() => Room, (room) => room.joinRooms)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id'})
  room: Room;
}
