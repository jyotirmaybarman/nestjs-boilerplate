import { Entity, Column } from "typeorm"

@Entity({ name: "users" })
export class User {

    @Column({ generated: "uuid", primary: true })
    id: string;
    
    @Column()
    first_name: string;
    
    @Column()
    middle_name?: string;
    
    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}