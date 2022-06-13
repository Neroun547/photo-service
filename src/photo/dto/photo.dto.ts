import { IsString, Length } from "class-validator";

export class PhotoDto {
    @IsString()
    @Length(1, 100)
    theme: string;

    @IsString()
    @Length(1, 1000)
    description: string;

    
}