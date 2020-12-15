
import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: string;
    
    @Column()
    public name: string;
    
    @Column()
    public description: string;

    @Column()
    status: TaskStatus;
  

    @ManyToOne(type => User)
    public user: User;

    @Column()
    userId: number;
}