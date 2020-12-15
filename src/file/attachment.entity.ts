import { SuperEntity } from "src/common/base.entity";
import { Task } from "src/tasks/task.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attachment extends SuperEntity {

    @Column()
    originalname: string;

    @Column()
    mimetype: string;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    size: number;

    @ManyToOne(type => Task, task => task.attachments, { eager: false })
    task: Task;

    @Column()
    taskId: number;

}