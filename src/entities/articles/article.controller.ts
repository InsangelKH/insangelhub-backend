import {
    Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ArticleService } from './article.service';
import { AuthGuard } from '../user/guard/auth.guard';
import { User } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/user.entity';
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
    async createArticle(
        @User() currentUser: UserEntity,
        @Body('article') createArticleDto: CreateArticleDto,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.createArticle(currentUser, createArticleDto);
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

    @Put(':slug')
    @UseGuards(AuthGuard)
    async updateArticle(
        @User() currentUser: UserEntity,
        @Param('slug') slug: string,
        @Body('article') updateArticleDto: CreateArticleDto,
    ): Promise<ArticleResponseInterface> {
        const article = await this.articleService.updateArticle(currentUser, slug, updateArticleDto);
        return this.articleService.buildArticleResponse(article);
    }
}
