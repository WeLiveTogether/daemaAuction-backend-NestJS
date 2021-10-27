import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTimeEntity {
  @CreateDateColumn({ name: 'created_date' })
  @ApiProperty({ name: '시작 날짜', example: '2021-10-21T10:05:58.008Z' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'modified_date' })
  @ApiProperty({ name: '수정 날짜', example: '2021-11-11T10:05:58.008Z' })
  modifiedDate: Date;
}
