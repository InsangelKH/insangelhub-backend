import {
    Body, Controller, Delete, Param, Post, Put, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createCommentDto';
import { AuthGuard } from '../user/guard/auth.guard';
import { User } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';
import { DeleteCommentDto } from './dto/deleteCommentDto';
import { UpdateCommentDto } from './dto/updateCommentDto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post(':slug')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async leaveComment(
        @Param('slug') slug: string,
        @Body('comment') crearteCommentDto: CreateCommentDto,
        @User() currentUser: UserEntity,
    ):Promise<CommentEntity> {
        return await this.commentService.leaveComment(slug, currentUser, crearteCommentDto);
    }

    @Put('')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateComment(
        @Body('comment') updateCommentDto: UpdateCommentDto,
        @User() currrentUser: UserEntity,
    ): Promise<CommentEntity> {
        return await this.commentService.updateComment(updateCommentDto.id, currrentUser, updateCommentDto.text);
    }

    @Delete()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async deleteComment(
        @Body('comment') deleteCommentDto: DeleteCommentDto,
        @User() currrentUser: UserEntity,
    ):Promise<DeleteResult> {
        return await this.commentService.deleteComment(deleteCommentDto.id, currrentUser);
    }
}
