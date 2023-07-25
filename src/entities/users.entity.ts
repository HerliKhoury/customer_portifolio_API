import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    BeforeInsert, 
    BeforeUpdate
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";

@Entity("user")
export class User{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 100, nullable: false })
    full_name:string;

    @Column({type: 'varchar', length: 45, nullable: false })
    email:string;

    @Column({type: 'varchar', length: 100, nullable: false })
    password: string;

    @Column({type: 'varchar', length: 20, nullable: false })
    phone_number:string;

    @CreateDateColumn({type: 'date', nullable: false}) 
    created_at: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const isEncrypted: number = getRounds(this.password); 

        if (!isEncrypted) {
            this.password = hashSync(this.password, 10);
        }
    }
}












