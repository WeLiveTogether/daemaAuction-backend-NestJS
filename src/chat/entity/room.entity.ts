import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinRoom } from './joinRoom.entity';
import { Message } from './message.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'msg_cnt' })
  msgCnt: number;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @OneToMany(() => JoinRoom, (joinRoom) => joinRoom.room)
  joinRooms: JoinRoom[];
}
