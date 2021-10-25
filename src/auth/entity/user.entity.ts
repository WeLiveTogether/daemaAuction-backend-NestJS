import { Exclude } from 'class-transformer';
import { Max, Min } from 'class-validator';
import { JoinRoom } from 'src/chat/entity/joinRoom.entity';
import { Message } from 'src/chat/entity/message.entity';
import { ProviderType } from 'src/oauth/entity/ProviderType';
import { RoleType } from 'src/oauth/entity/RoleType';
import { Product } from 'src/product/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'USER_SEQ' })
  userSeq: number;

  @Column({ name: 'user_id', length: 64, unique: true })
  userId: string;

  @Column({ name: 'USERNAME', length: 100 })
  username: string;

  @Column({ name: 'PASSWORD', length: 128, nullable: false })
  password: string;

  @Column({ name: 'EMAIL', length: 512, unique: true })
  email: string;

  @Max(1)
  @Min(1)
  @Column({ name: 'EMAIL_VERIFIED_YN', length: 1, nullable: false })
  emailVerifiedYn: string;

  @Max(512)
  @Column({ name: 'PROFILE_IMAGE_URL', length: 512, nullable: false })
  profileImageUrl: string;

  @Column({ name: 'PROVIDER_TYPE' })
  providerType: ProviderType;

  @Column({ name: 'ROLE_TYPE', type: 'enum', enum: RoleType })
  roleType: RoleType;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  @OneToMany(() => JoinRoom, (joinRoom) => joinRoom.user)
  joinRooms: JoinRoom[];
}
