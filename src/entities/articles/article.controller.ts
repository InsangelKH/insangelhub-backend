import {
    Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';
import { getMulterOptions } from '../../helpers/fileLoader';
import { User } from '../user/decorator/user.decorator';
import { AuthGuard } from '../user/guard/auth.guard';
import { UserEntity } from '../user/user.entity';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponseInterface';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async findAll(
        @Query() query: any,
    ): Promise<ArticlesResponseInterface> {
        return await this.articleService.findAll(query);
    }

    @Get(':slug')
    async findArticleBySlug(
        @Param('slug') slug: string,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.findBySlug(slug);
        return this.articleService.buildArticleResponse(article);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FilesInterceptor('image', 10, getMulterOptions()))
    async createArticle(
        @User() currentUser: UserEntity,
        @Body() createArticleDto: CreateArticleDto,
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<ArticleResponseInterface> {
        if (images) {
            const article = await this.articleService.createArticle(currentUser, createArticleDto, images);
            return this.articleService.buildArticleResponse(article);
        }
        const article = await this.articleService.createArticle(currentUser, createArticleDto);
        return this.articleService.buildArticleResponse(article);
    }

    @Put(':slug')
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('image', 10, getMulterOptions()))
    async updateArticle(
        @User() currentUser: UserEntity,
        @Param('slug') slug: string,
        @Body() updateArticleDto: CreateArticleDto,
        @UploadedFiles() images: Express.Multer.File[],
    ): Promise<ArticleResponseInterface> {
        if (images) {
            const article = await this.articleService.updateArticle(currentUser, slug, updateArticleDto, images);
            return this.articleService.buildArticleResponse(article);
        }
        const article = await this.articleService.updateArticle(currentUser, slug, updateArticleDto);
        return this.articleService.buildArticleResponse(article);
    }

    @Delete(':slug')
    @UseGuards(AuthGuard)
    async deleteArticle(
        @User() currentUser: UserEntity,
        @Param('slug') slug: string,
    ): Promise<DeleteResult> {
        return await this.articleService.deleteArticle(currentUser, slug);
    }
}
