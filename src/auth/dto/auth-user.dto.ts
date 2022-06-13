import { IsNotEmpty, IsString, Length } from "class-validator";


export class AuthUserDto {
    @IsString()
    @Length(3, 30)
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
