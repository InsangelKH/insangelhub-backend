import {
    Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from '../user/decorator/user.decorator';
import { AuthGuard } from '../user/guard/auth.guard';
import { UserEntity } from '../user/user.entity';
import { CreateResumeDto } from './dto/CreateResumeDto';
import { ResumeEntity } from './resume.entity';
import { ResumeService } from './resume.service';

@Controller('resume')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {}

    @Get(':id')
    async findResume(
        @Param('id') id: number,
    ): Promise<ResumeEntity> {
        return await this.resumeService.findResumeById(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createResume(
        @Body('resume') createResueDto: CreateResumeDto,
        @User() currentUser: UserEntity,
    ): Promise<ResumeEntity> {
        return await this.resumeService.createResume(createResueDto, currentUser);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateResume(
        @Body('resume') updateResumeDto: CreateResumeDto,
        @Param('id') id: number,
        @User() currentUser: UserEntity,
    ): Promise<ResumeEntity> {
        return await this.resumeService.updateResume(updateResumeDto, id, currentUser);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteResume(
        @Param('id') id: number,
        @User() currentUser: UserEntity,
    ): Promise<DeleteResult> {
        return await this.resumeService.deleteResume(id, currentUser);
    }
}
