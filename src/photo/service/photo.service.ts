import { Injectable } from "@nestjs/common";
import { PhotoServiceDB } from "db/photo/photo.service";
import { IGetNameFilePhoto } from "../interfaces/getNameFilePhoto.interface";
import { IGetPhotoId } from "../interfaces/getPhotoId.interface";

@Injectable()
export class PhotoService {
    constructor(private photoServiceDb: PhotoServiceDB) {};

    async saveIdPhoto(filename: string, description: string, theme: string, author: number) {
        await this.photoServiceDb.savePhotoId(filename, description, theme, author);
    }
    async getPhotoId(author: number, skip: number, take: number): Promise<IGetPhotoId[]> {
        return (await this.photoServiceDb.getPhotoIdByAuthor(author, skip, take)).map(el => ({ _id: el._id, theme: el.theme }));
    }
    async getNameFilePhoto(_id: number): Promise<IGetNameFilePhoto> {
        return (await this.photoServiceDb.getNameFilePhoto(_id));
    } 
    async deletePhotoById(_id: number) {
        await this.photoServiceDb.deletePhotoById(_id);
    }
    async getRandomPhoto() {
        const countPhoto = await this.photoServiceDb.getCountPhoto();

        if(countPhoto < 12) {
            return (await this.photoServiceDb.getPhotoId(0, 6)).map(el => ({ _id: el._id, theme: el.theme }));
        }
        const randomSkip = Math.floor(Math.random() * 6);
        return (await this.photoServiceDb.getPhotoId(randomSkip, 6)).map(el => ({ _id: el._id, theme: el.theme }));
    }
    async getPhotoByTheme(theme: string, skip: number, take: number) {
        return (await this.photoServiceDb.getPhotoByTheme(theme, skip, take)).map(el => ({ _id: el._id, theme: el.theme }));
    }
};
