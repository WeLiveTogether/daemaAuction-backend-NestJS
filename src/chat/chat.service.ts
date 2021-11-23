import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/entity/user.repository';
import { Product } from 'src/product/entity/product.entity';
import { ProductRepository } from 'src/product/entity/product.repository';
import { ObjectLiteral } from 'typeorm';
import { JoinRoom } from './entity/joinRoom.entity';
import { JoinRoomRepository } from './entity/joinRoom.repository';
import { Room } from './entity/room.entity';
import { RoomRepository } from './entity/room.repository';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(RoomRepository)
    private readonly roomRepository: RoomRepository,
    @InjectRepository(JoinRoomRepository)
    private readonly joinRoomRepository: JoinRoomRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async createRoom(productId: number): Promise<string> {
    let room: Room = new Room();
    // 메시지 갯수인데 DB바꾸기 좀 그래서 그냥 제품id 넣어놈
    room.msgCnt = productId;
    let consumer: JoinRoom = new JoinRoom();
    let seller: JoinRoom = new JoinRoom();

    const product: Product = await this.productRepository.findOne(productId);

    console.log(product)

    room = await this.roomRepository.save(room);

    consumer.room = room;
    consumer.user = await this.userRepository.findOne({where: {userId: product.consumerId}});

    seller.room = room;
    seller.user = await this.userRepository.findOne(product.userId);

    console.log(seller)

    consumer = await this.joinRoomRepository.save(consumer)
    seller = await this.joinRoomRepository.save(seller)

    return 'room created';
  }

  async test(){
    const test = await this.joinRoomRepository.find({
      where: {user: await this.userRepository.findOne({ where: {userId: 111097419968456714526}}) },
      relations: ['room', 'user']
    });
    console.log('chat Room List')
    console.log(test)
  }
}
