import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    ManyToOne, 
    DeepPartial
} from "typeorm";
import { User } from "./users.entity";

@Entity("customer")
export class Customer{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({type: 'varchar', length: 100, nullable: false })
    full_name: string;

    @Column({type: 'varchar', length: 45, nullable: false })
    email: string;

    @Column({type: 'varchar', length: 20, nullable: false })
    phone_number:string;

    @CreateDateColumn({type: 'date', nullable: false}) 
    created_at: string;

    @ManyToOne(() => User, { eager: true } )
    user: number;
}