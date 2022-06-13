import { Body, Controller, Post, Get, Req, Res, UploadedFile, UseGuards, UseInterceptors, Param, Query, Delete } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PhotoService } from "./service/photo.service";
import { existsSync, readFile } from "fs";
import { resolve } from "path";

@Controller()
export class PhotoController {
    constructor(private service: PhotoService) {};

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor("picture"))
    @Post()
    async addPhoto(@UploadedFile() file: Express.Multer.File, @Body() body, @Req() req: Request, @Res() res: Response) {
        await this.service.saveIdPhoto(file.filename, body.description, body.theme, req.user["_id"]);

        res.send({message: "Photo uploaded success"});
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getPhotoId(@Req() req: Request, @Query("skip") skip: number, @Query("take") take: number, @Res() res: Response) {
        const photoId = await this.service.getPhotoId(req.user["_id"], skip, take);

        res.send({data: photoId, loadMore: photoId.length > 5 ? true : false});
    }

    @Get("search-by-theme/:theme")
    async searchByTheme(@Param("theme") theme: string) {
        return await this.service.getPhotoByTheme(theme, 0, 6);
    }
    
    @Get("random")
    async getRandomPhoto() {
        return await this.service.getRandomPhoto();
    }

    @Get(":id")
    async getPhoto(@Param("id") id: number, @Res() res) {
        const getNameFilePhoto = await this.service.getNameFilePhoto(id);
        
        if(getNameFilePhoto) {
            readFile(resolve("upload/"+getNameFilePhoto.idPhoto), (err, data) => {
                res.send(data);
            });
        }
    }

    @Delete(":id")
    async deletePhotoById(@Param("id") id: number) {
        await this.service.deletePhotoById(id);

        return;
    }
};
