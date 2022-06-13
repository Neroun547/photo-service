import { IUser } from "../interfaces/user.interface";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDto implements IUser {
    @IsString()
    @Length(3, 30)
    name: string;

    @IsString()
    @Length(3, 30)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
