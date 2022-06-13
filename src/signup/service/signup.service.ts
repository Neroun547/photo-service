import { BadRequestException, Injectable } from "@nestjs/common";
import { UserServiceDb } from "db/user/user.service";
import { IUser } from "../interfaces/user.interface"; 
import { createHmac } from "crypto";
import { secretSha256 } from "config.json";

@Injectable()
export class SignUpService {
    constructor(private readonly userServiceDb: UserServiceDb) {};

    async signUp(user: IUser) {
        const userDb = await this.userServiceDb.findUserByUsernameOrEmail(user.email, user.username);
        
        if(userDb) {
            if(userDb.email === user.email) {
                throw new BadRequestException({ message: "User with this email already exist" });
            }
            if(userDb.username === user.username) {
                throw new BadRequestException({ message: "User with this username already exist" });
            }
        }
        const saveUser = {
            ...user,
            password: createHmac("sha256", secretSha256).update(user.password).digest("hex") 
        }
        await this.userServiceDb.createUser(saveUser);
    }
}
