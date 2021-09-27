import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Message } from './Message.entity';

@Injectable()
@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {}
