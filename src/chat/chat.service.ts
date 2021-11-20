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

  async createRoom(productId: string): Promise<string> {
    let room: Room = new Room();
    let customer: JoinRoom = new JoinRoom();
    let seller: JoinRoom = new JoinRoom();

    const product: Product = await this.productRepository.findOne(productId);

    room = await this.roomRepository.save(room);

    customer.room = room;
    customer.user = await this.userRepository.findOne(product.customerId);

    seller.room = room;
    seller.user = await this.userRepository.findOne(product.userId);

    customer = await this.joinRoomRepository.save(customer)
    seller = await this.joinRoomRepository.save(seller)

    return 'room created';
  }
}
