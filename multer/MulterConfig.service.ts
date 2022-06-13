import { BadRequestException, Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import * as multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
        storage: storage,
        fileFilter:(req, file, cb) => {
            if(file.mimetype !== "image/png" && file.mimetype !== "image/jpeg" && file.mimetype !== "image/jpg") {
                cb(new BadRequestException({ message: "File must be JPG, PNG or JPEG !" }), false);
                return;
            } 
            cb(null, true);
        }
    };
  }
}
