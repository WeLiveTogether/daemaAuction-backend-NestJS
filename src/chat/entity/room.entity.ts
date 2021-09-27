import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinRoom } from './joinRoom.entity';
import { Message } from './Message.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  msgCnt: number;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @OneToMany(() => JoinRoom, (joinRoom) => joinRoom.room)
  joinRooms: JoinRoom[];
}
