import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";  
import { IPhoto } from "./interface/photo.interface";

@Entity()
export class Photo implements IPhoto {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column({ unique: true })
    idPhoto: string;

    @Column()
    author: number;
    
    @Column()
    theme: string;

    @Column()
    description: string;
}
