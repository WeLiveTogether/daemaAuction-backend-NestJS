import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './entity/room.repository';
import { UserRepository } from 'src/auth/entity/user.repository';
import { ProductRepository } from 'src/product/entity/product.repository';
import { JoinRoomRepository } from './entity/joinRoom.repository';
import { MessageRepository } from './entity/message.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomRepository,
      UserRepository,
      ProductRepository,
      JoinRoomRepository,
      MessageRepository,
    ])
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
