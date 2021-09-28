import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {}
