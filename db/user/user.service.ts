import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUser } from "./interface/user.interface";
import { User } from "./user.entity";

@Injectable()
export class UserServiceDb {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    async findUserByUsername(username: string) {
        return await this.repository.findOne({ where: { username: username } });
    }
    async findUserByUsernameOrEmail(email: string, username: string) {
        return await this.repository.createQueryBuilder()
        .select("user")
        .from(User, "user")
        .where("user.username = :username OR user.email = :email", { username: username, email: email })
        .getOne()
    }
    async createUser(user: IUser) {
        await this.repository.save(user);
    }
    async getUserById(_id: number) {
        return await this.repository.findOne({ where: { _id: _id } });
    }
}
