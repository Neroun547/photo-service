import { Controller, Body, Post, HttpCode } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { SignUpService } from "./service/signup.service";

@Controller()
export class SignUpController {
    constructor(private readonly service: SignUpService) {};

    @Post()
    async signUp(@Body() user: UserDto) {
        await this.service.signUp(user);

        return { message: "User create" };
    }
}
