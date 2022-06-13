import { UserServiceDb } from "./user.service";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserServiceDb],
    exports: [UserServiceDb]
})
export class UserModuleDb {};