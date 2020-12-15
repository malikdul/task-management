import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

import * as bcrypt from 'bcrypt';
import { SuperEntity } from "src/common/base.entity";

@Entity()
export class User extends SuperEntity {
    
    @Column()
    first_name: string;
    
    @Column()
    last_name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;
    
    @Column()
    role: string;

 
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        console.log(hash, hash === this.password);
        return hash === this.password;
    }
}