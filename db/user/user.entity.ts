import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./interface/user.interface";

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;
}
