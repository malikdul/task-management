import { BaseEntity, UpdateDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class SuperEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

}