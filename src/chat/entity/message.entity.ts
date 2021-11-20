import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './room.entity';

@Entity()
export class Message {
  // constructor(writer: string, context: string, sendAt: Date, user: User, room: Room){
  //   writer = this.writer;
  //   context = this.context;
  //   sendAt = this.sendAt;
  //   user = this.user;
  //   room = this.room;
  // }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'writer' })
  writer: string;

  @Column({ name: 'context' })
  context: string;

  @Column({ name: 'send_at' })
  sendAt: Date;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userSeq'})
  user: User;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id'})
  room: Room;
}
