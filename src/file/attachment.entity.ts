import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attachment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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

}