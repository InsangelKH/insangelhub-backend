import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUserDto';
import { UserResponseInterface } from './types/userResponse.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepositry: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepositry.findOne({
            where: { email: createUserDto.email },
        });
        const userByUsername = await this.userRepositry.findOne({
            where: { username: createUserDto.username },
        });

        if (userByEmail || userByEmail) {
            throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepositry.save(newUser);
    }

    generateJwn(user: UserEntity): string {
        return sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            JWT_SECRET,
        );
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwn(user),
            },
        };
    }
}
