import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { ArticleEntity } from './article.entity';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponseInterface';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
    ) {}

    async createArticle(
        currentUser: UserEntity,
        createArticleDto: CreateArticleDto,
    ): Promise<ArticleEntity> {
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto);

        article.slug = this.getSlug(createArticleDto.title);
        article.author = currentUser;

        return await this.articleRepository.save(article);
    }

    buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
        return { article };
    }

    getSlug(title: string): string {
        return `${slugify(title, { lower: true })}-${((Math.random() * 36 ** 6) | 0).toString(36)}`;
    }
}
