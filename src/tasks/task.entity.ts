
import { SuperEntity } from "src/common/base.entity";
import { Attachment } from "src/file/attachment.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends SuperEntity {
    
    @Column()
    public title: string;
    
    @Column()
    public description: string;

    @Column()
    status: TaskStatus;
  

    @ManyToOne(type => User)
    public user: User;

    @Column()
    userId: number;
    
    @OneToMany(type => Attachment, attachment => attachment.task, { eager: true, onDelete: 'CASCADE' })
    attachments: Attachment[];

}