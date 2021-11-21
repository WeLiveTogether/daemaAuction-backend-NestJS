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
import { JoinRoomRepository } from './entity/joinRoom.repository';
import { Message } from './entity/message.entity';
import { MessageRepository } from './entity/message.repository';
import { Room } from './entity/room.entity';
import { RoomRepository } from './entity/room.repository';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository,
    @InjectRepository(JoinRoomRepository)
    private readonly joinRoomRepository: JoinRoomRepository
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

  // joinRoom
  @SubscribeMessage('joinRoom')
  joinRoom(socket: Socket, roomId: number): void {
    this.logger.log('event joinRoom');
    socket.join(String(roomId));
    console.log('socket.id:', socket.id)
    console.log('socket.rooms:',socket.rooms)
  }

  // 채팅방 리스트 가져오기
  @SubscribeMessage('chatRoomList')
  async chatRoomList(
    @ConnectedSocket() client: Socket,
    @MessageBody() userId: string
  ){
    this.logger.log('event chatRoomList');
    const roomList:JoinRoom[] = await this.joinRoomRepository.find({
      where: {user: await this.userRepository.findOne({ where: {userId: userId}}) },
      relations: ['room', 'user']
    });

    console.log(roomList);
    
    this.server.to(client.id).emit('chatRoomList', roomList);
  }

  // 메시지 리스트 가져오기
  @SubscribeMessage('msgList')
  async msgList(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: number
  ){

    const messages: Message[] = await this.messageRepository.find({ where: {room: await this.roomRepository.findOne(roomId)} });

    this.logger.log('evnet msgList');
    this.server.to(String(roomId)).emit('chatMsgList', messages)
    console.log(client.rooms)
    console.log(messages)
  }

  // 메시지 보내기
  @SubscribeMessage('msgToServer')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: msgReq,
  ) {
    this.logger.log('evnet msgToServer');
    const time = new Date(client.handshake.time)

    console.log(data)
  
    const user = await this.userRepository.findOne({ where: {userId: data.userId}});
    const room = await this.roomRepository.findOne(data.roomId);

    const res: msgRes = {
      msg: data.msg,
      senderId: data.userId,
      senderName: user.username,
      time: time.toLocaleString(),
    };

    const message = new Message();
    message.writer = user.username;
    message.context = data.msg;
    message.sendAt = time;
    message.user = user;
    message.room = room;

    this.messageRepository.save(message);
    this.roomRepository.save(room);

    this.server.to(String(data.roomId)).emit('msgToClient', res);
    console.log('message sended!');
  }
}
