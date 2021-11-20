import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { JoinRoom } from './joinRoom.entity';
import { Room } from './room.entity';

@Injectable()
@EntityRepository(JoinRoom)
export class JoinRoomRepository extends Repository<JoinRoom> {
  joinRoomSave(joinRoom: JoinRoom ){
    return this.createQueryBuilder('joinRoom')
    .insert()
    .into(JoinRoom)
    .values({user: joinRoom.user, room: joinRoom.room})
    .execute()
  }
}