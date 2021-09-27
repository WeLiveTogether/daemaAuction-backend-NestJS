import { CreateDateColumn } from 'typeorm';

export class BaseTimeEntity {
  @CreateDateColumn()
  private createdDate: Date;
}
