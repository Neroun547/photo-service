import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { secretJwt } from "config.json";
import { UserModuleDb } from "db/user/user.module";
import { AuthService } from "./service/auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: secretJwt,
            signOptions: {expiresIn: "6h"}
        }),
        UserModuleDb
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {};
