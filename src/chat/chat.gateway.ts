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
import { JoinRoom } from './entity/joinRoom.entity';
import { Message } from './entity/message.entity';
import { MessageRepository } from './entity/message.repository';
import { Room } from './entity/room.entity';
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

  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, roomId: number): void {
    socket.join(String(roomId));
  }

  @SubscribeMessage('chatRoomList')
  async chatRoomList(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: number
  ){
    const roomList:Room[] = await this.roomRepository.find({where: {joinRooms: userId}});
    
    client.to(client.id).emit('chatRoomList', roomList);
  }

  @SubscribeMessage('msgList')
  async msgList(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number
  ){
    client.to(String(roomId)).emit('chatMsgList', (await this.roomRepository.findOne(roomId)).messages)
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
