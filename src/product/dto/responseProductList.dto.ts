import { ApiProperty } from '@nestjs/swagger';
import { BaseTimeEntity } from 'src/entities/baseTimeEntity';

export class ResponseProductList extends BaseTimeEntity {
  @ApiProperty({ description: '상품 아이디', example: 5 })
  id: number;

  @ApiProperty({ description: '상품 이름', example: '2020년형 중고 노트북' })
  name: string;

  @ApiProperty({ description: '즉시 판매가', example: 3000000 })
  immePrice: number;

  @ApiProperty({ description: '경매 판매가', example: 2500000 })
  auctionPrice: number;

  @ApiProperty({ description: '시작 시간' })
  startAt: Date;

  @ApiProperty({ description: '방문 횟수', example: 2 })
  views: number;

  @ApiProperty({
    description: '상품 올린 유저 이름',
    example: { username: 'asdf qe' },
  })
  user: any;

  @ApiProperty({ description: '카테고리 이름', example: { name: '전자제품' } })
  categoryId: any;

  @ApiProperty({
    description: '부 카테고리 이름',
    example: { name: '액세서리' },
  })
  subCategoryId: any;
}
