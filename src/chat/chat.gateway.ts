import { Logger } from '@nestjs/common';
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
import MsgReq from './dto/MsgReq.dto';
import MsgRes from './dto/MsgRes.dto';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
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

  // createRoom(socket: Socket, data: string): WsResponse<unknown> {
  //   socket.join('aRoom');
  //   socket.to('aRoom').emit('roomCreated', { room: 'aRoom' });
  //   return { event: 'roomCreated', room: 'aRoom' };
  // }

  @SubscribeMessage('msgToServer')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: MsgReq,
  ) {
    const res: MsgRes = {
      msg: data.msg,
      senderID: data.userID,
      time: new Date(client.handshake.time).toLocaleString(),
    };
  }
}
