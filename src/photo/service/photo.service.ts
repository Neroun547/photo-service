import { Injectable } from "@nestjs/common";
import { PhotoServiceDB } from "db/photo/photo.service";
import { UserServiceDb } from "db/user/user.service";
import { IGetNameFilePhoto } from "../interfaces/getNameFilePhoto.interface";
import { IGetPhotoId } from "../interfaces/getPhotoId.interface";

@Injectable()
export class PhotoService {
    constructor(private photoServiceDb: PhotoServiceDB, private userServiceDb: UserServiceDb) {};

    async saveIdPhoto(filename: string, description: string, theme: string, author: number) {
        await this.photoServiceDb.savePhotoId(filename, description, theme, author);
    }
    async getPhotoIdAndInfo(author: number, skip: number, take: number): Promise<IGetPhotoId[]> {
        return (await this.photoServiceDb.getPhotoIdByAuthor(author, skip, take)).map(el => ({ _id: el._id, theme: el.theme, description: el.description }));
    }
    async getNameFilePhoto(_id: number): Promise<IGetNameFilePhoto> {
        return (await this.photoServiceDb.getInfoPhotoById(_id));
    } 
    async deletePhotoById(_id: number) {
        await this.photoServiceDb.deletePhotoById(_id);
    }
    async getRandomPhoto(): Promise<IGetPhotoId[]> {
        const countPhoto = await this.photoServiceDb.getCountPhoto();

        if(countPhoto < 12) {
            return (await this.photoServiceDb.getPhotoId(0, 6)).map(el => ({ _id: el._id, theme: el.theme, description: el.description }));
        }
        const randomSkip = Math.floor(Math.random() * 6);
        return (await this.photoServiceDb.getPhotoId(randomSkip, 6)).map(el => ({ _id: el._id, theme: el.theme, description: el.description }));
    }
    async getPhotoByTheme(theme: string, skip: number, take: number): Promise<IGetPhotoId[]> {
        return (await this.photoServiceDb.getPhotoByTheme(theme, skip, take)).map(el => ({ _id: el._id, theme: el.theme, description: el.description }));
    }
    async getUsernameAuthorByPhotoId(_id: number): Promise<string> {
        const author = (await this.photoServiceDb.getInfoPhotoById(_id)).author;
        const user = await this.userServiceDb.getUserById(author);

        return user.username;
    }
};
