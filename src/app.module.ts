import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entity/user.entity';
import { Product } from './product/entity/product.entity';
import { Room } from './chat/entities/room.entity';
import { JoinRoom } from './chat/entities/joinRoom.entity';
import { Category } from './category/entities/Category.entity';
import { SubCategory } from './category/entities/subCategory.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": process.env.DB_HOST,
      "port": 3306,
      "username": process.env.DB_USER,
      "password": process.env.DB_PWD,
      "database": process.env.DB_NM,
      "entities": ["dist/entity/*.entity{.ts,.js}"],
      "synchronize": true,
      "timezone": "+09:00"
    }),
    TypeOrmModule.forFeature([User, Product, Room, JoinRoom, Category, SubCategory]),
    ChatModule,
    AuthModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
