import {
    Body, Controller, Post, UseGuards, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '../user/guard/auth.guard';
import { User } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponseInterface';

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

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
}
