import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserServiceDb } from "db/user/user.service";
import { IUser } from "../interfaces/auth-user.interface";
import { createHmac } from "crypto";
import { secretSha256 } from "config.json";
import { JwtService } from "@nestjs/jwt";
import { secretJwt } from "config.json";

@Injectable()
export class AuthService {
    constructor(private userServiceDb: UserServiceDb, private jwtService: JwtService) {};

    async signIn(user: IUser) {
        const userInDb = await this.userServiceDb.findUserByUsername(user.username);

        if(!userInDb) {
            throw new NotFoundException({ message: "User not found" });
        }
        const hash = createHmac("sha256", secretSha256).update(user.password).digest("hex");
        
        if(hash !== userInDb.password) {
            throw new BadRequestException({ message: "Invalid password" });
        }

        return this.jwtService.sign({ _id: userInDb._id, username: userInDb.username, email: userInDb.email, name: userInDb.name }, { secret: secretJwt, expiresIn: "6h" });
    }   
};
