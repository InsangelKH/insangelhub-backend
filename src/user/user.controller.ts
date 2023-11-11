import {
    Body, Controller, Post, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UserService } from './user.service';
import { UserResponseInterface } from './types/userResponse.interface';

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
}
