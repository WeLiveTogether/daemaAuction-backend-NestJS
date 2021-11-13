import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserRepository } from 'src/auth/entity/user.repository';
import msgReq from './dto/MsgReq.dto';
import msgRes from './dto/MsgRes.dto';
import { Message } from './entity/message.entity';
import { MessageRepository } from './entity/message.repository';
import { RoomRepository } from './entity/room.repository';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository
  ){}
  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  handleDisconnect(client: Socket) {
    this.logger.log('Client DisConnect: ' + client.id);
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client Connect: ' + client.id);
  }
  afterInit(server: Server) {
    this.logger.log('Gateway Init');
  }

  joinRoom(socket: Socket, roomId: number): void {
    socket.join(String(roomId));
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: msgReq,
  ) {
    const time = new Date(client.handshake.time)

    const res: msgRes = {
      msg: data.msg,
      senderId: data.userId,
      time: time.toLocaleString(),
    };

    const user = await this.userRepository.findOne(data.userId);
    const room = await this.roomRepository.findOne(data.roomId);

    const message = new Message(user.username, res.msg, time, user, room);

    await this.messageRepository.save(message);
    room.messages.push(message);
    await this.roomRepository.save(room);

    client.to(String(data.roomId)).emit('msgToClient', res);
  }
}
