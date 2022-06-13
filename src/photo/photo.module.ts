import { Module } from "@nestjs/common";
import { PhotoController } from "./photo.controller";
import { PhotoService } from "./service/photo.service";
import { PhotoModuleDB } from "db/photo/photo.module";
import { MulterModule } from "@nestjs/platform-express";
import { MulterConfigService } from "multer/MulterConfig.service";

@Module({
    imports: [PhotoModuleDB, 
        MulterModule.registerAsync({
            useClass: MulterConfigService
        })],
    controllers: [PhotoController],
    providers: [PhotoService]
})
export class PhotoModule {};
