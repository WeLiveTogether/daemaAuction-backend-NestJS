import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { JoinRoom } from './joinRoom.entity';

@Injectable()
@EntityRepository(JoinRoom)
export class JoinRoomRepository extends Repository<JoinRoom> {}
