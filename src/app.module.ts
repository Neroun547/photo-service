import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SignUpModule } from "./signup/signup.module"; 
import { PhotoModule } from "./photo/photo.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { passwordDb, userDb, hostDb, database, synchronizeDb, autoLoadEntitiesDb } from "config.json";
import { User } from "db/user/user.entity";
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: hostDb,
      username: userDb,
      password: passwordDb,
      database: database,
      entities: [User],
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    SignUpModule,
    PhotoModule,
    RouterModule.register([
      {
        path: "/signup",
        module: SignUpModule
      },
      {
        path: "/signin",
        module: AuthModule
      },
      {
        path: "/photo",
        module: PhotoModule
      }
    ])
  ],
})
export class AppModule {}
