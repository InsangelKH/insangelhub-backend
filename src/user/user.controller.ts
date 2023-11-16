import { getMulterOptions } from '@app/helpers/fileLoader';
import {
    Body, Controller, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { User } from './decorator/user.decorator';
import { CreateUserDto } from './dto/createUserDto';
import { LoginUserDto } from './dto/loginUserDto';
import { UpdateUserDto } from './dto/updateUserDto';
import { AuthGuard } from './guard/auth.guard';
import { ProfleResponseInterface } from './types/profileResponse.interface';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async createUser(
        @Body('user') createUserDto: CreateUserDto,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async loginUser(
        @Body('user') loginUserDto: LoginUserDto,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.loginUser(loginUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Get('user')
    @UseGuards(AuthGuard)
    async getUser(
        @User() user: UserEntity,
    ): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(user);
    }

    @Post('profile')
    @UseGuards(AuthGuard)
    async getProfileById(
        @Body('id') userId: string,
    ): Promise<ProfleResponseInterface> {
        const profile = await this.userService.findProfileById(Number(userId));
        return this.userService.buildProfileResponse(profile);
    }

    @Put('user')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image', getMulterOptions()))
    async updateCurrentUser(
        @User('id') currrentUserId: number,
        @Body('user') updateUserDto: UpdateUserDto,
        @UploadedFile() image: Express.Multer.File,
    ): Promise<UserResponseInterface> {
        const imageName = image.filename;
        const user = await this.userService.updateUser(updateUserDto, currrentUserId);
        return this.userService.buildUserResponse(user);
    }
}
