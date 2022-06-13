import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthUserDto } from "./dto/auth-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthService } from "./service/auth.service";

@Controller()
export class AuthController {
    constructor(private service: AuthService) {};

    @Post("auth")
    async signIn(@Body() user: AuthUserDto) {
        const token = await this.service.signIn(user);

        return { message: token };
    }

    @UseGuards(JwtAuthGuard)
    @Get("check-token")
    checkToken() {
        return;
    }
};
