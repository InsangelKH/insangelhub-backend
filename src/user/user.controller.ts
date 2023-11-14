import {
    Body, Controller, Get, Post, Put, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUserDto';
import { AuthGuard } from './guard/auth.guard';
import { User } from './decorator/user.decorator';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/updateUserDto';

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

    @Put('user')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    async updateCurrentUser(
        @User('id') currrentUserId: number,
        @Body('user') updateUserDto: UpdateUserDto,
        @UploadedFile() image: Express.Multer.File,
    ): Promise<UserResponseInterface> {
        const user = await this.userService.updateUser(updateUserDto, currrentUserId, image);
        return this.userService.buildUserResponse(user);
    }
}
