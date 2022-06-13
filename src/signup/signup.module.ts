import { Module } from "@nestjs/common";
import { SignUpController } from "./signup.controller";
import { UserModuleDb } from "db/user/user.module";
import { SignUpService } from "./service/signup.service";

@Module({
    imports: [UserModuleDb],
    controllers: [SignUpController],
    providers: [SignUpService]
})
export class SignUpModule {};
