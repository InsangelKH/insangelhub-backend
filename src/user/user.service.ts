import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { compare } from 'bcrypt';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/createUserDto';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { ProfleResponseInterface } from './types/profileResponse.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            where: { email: createUserDto.email },
        });
        const userByUsername = await this.userRepository.findOne({
            where: { username: createUserDto.username },
        });

        if (userByEmail || userByEmail) {
            throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email: loginUserDto.email },
            select: ['id', 'username', 'email', 'bio', 'image', 'password', 'role'],
        });

        if (!user) {
            throw new HttpException('Invalid username or password', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        const isPasswordCorrect = await compare(loginUserDto.password, user.password);

        if (!isPasswordCorrect) {
            throw new HttpException('Invalid email or password', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        delete user.password;

        return user;
    }

    async findById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({
            where: { id },
        });
    }

    async findProfileById(id: number): Promise<UserEntity> {
        const profile = await this.findById(id);
        delete profile.id;
        delete profile.role;
        return profile;
    }

    async updateUser(updateUserDto: UpdateUserDto, userId: number, image?: string): Promise<UserEntity> {
        const user = await this.findById(userId);
        if (image) {
            user.image = image;
        }
        Object.assign(user, updateUserDto);
        return await this.userRepository.save(user);
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

    buildProfileResponse(user: UserEntity): ProfleResponseInterface {
        return {
            user: {
                ...user,
            },
        };
    }
}
