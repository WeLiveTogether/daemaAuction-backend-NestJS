import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:id')
  @ApiOperation({
    summary: '채팅방 생성',
    description: '채팅방 생성',
  })
  @ApiOkResponse({
    description: '채팅방 생성',
    type: String
})
  @ApiParam({
    name: 'id',
    description: '제품 아이디',
    example: 5,
  })
  async createChatRoom(
    @Param() productId: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    try {
      this.chatService.createRoom(productId);
    } catch (error: unknown) {
      return res.status(HttpStatus.BAD_GATEWAY).json({ 'response': error });
    }
    return res.status(HttpStatus.CREATED).json({ 'response': 'room created' });
  }
}
