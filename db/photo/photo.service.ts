import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Photo } from "./photo.entity";

@Injectable()
export class PhotoServiceDB {
    constructor(@InjectRepository(Photo) private photoRepository: Repository<Photo>) {};

    async savePhotoId(filename: string, description: string, theme: string, author: number) {
        await this.photoRepository.save({ idPhoto: filename, description: description, theme: theme, author: author });  
    }
    async getPhotoIdByAuthor(author: number, skip: number, take: number) {
        return await this.photoRepository.find({ where: { author: author }, skip: skip, take: take }); 
    }
    async getPhotoId(skip: number, take: number) {
        return await this.photoRepository.find({ skip: skip, take: take });  
    }
    async getInfoPhotoById(_id: number) {
        return await this.photoRepository.findOne({ where: { _id: _id } });
    }
    async deletePhotoById(_id: number) {
        await this.photoRepository.delete({ _id: _id });
    }
    async getCountPhoto() {
        return await this.photoRepository.count();
    }
    async getPhotoByTheme(theme: string, skip: number, take: number) {
        return await this.photoRepository.createQueryBuilder("photo")
        .where("photo.theme LIKE :theme", { theme:`%${theme.trim()}%` })
        .take(take)
        .skip(skip)
        .getMany(); 
    }
}
