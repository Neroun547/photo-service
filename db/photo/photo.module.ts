import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photo } from "./photo.entity";
import { PhotoServiceDB } from "./photo.service";

@Module({
    imports: [TypeOrmModule.forFeature([Photo])],
    providers: [PhotoServiceDB],
    exports: [PhotoServiceDB]
})
export class PhotoModuleDB {};