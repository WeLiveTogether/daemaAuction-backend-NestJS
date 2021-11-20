import { Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinRoom } from './joinRoom.entity';
import { Message } from './message.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  msgCnt: number;

  @OneToMany(() => Message, (message) => message.room)
  @JoinColumn()
  messages: Message[];

  @OneToMany(() => JoinRoom, (joinRoom) => joinRoom.room)
  @JoinColumn()
  joinRooms: JoinRoom[];
}
