import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {}
