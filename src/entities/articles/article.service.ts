import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import slugify from 'slugify';
import { ArticleEntity } from './article.entity';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponseInterface';
import { ArticlesResponseInterface } from './types/articlesResponse.interface';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findAll(query: any): Promise<ArticlesResponseInterface> {
        const queryBuilder = this.articleRepository
            .createQueryBuilder('articles')
            .leftJoinAndSelect('articles.author', 'author');

        queryBuilder.orderBy('articles.createdAt', 'DESC');

        if (query.sort && query.sortBy) {
            const direction = query.sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
            queryBuilder.orderBy(`articles.${query.sortBy}`, direction);
        }

        const articlesCount = await queryBuilder.getCount();

        if (query.tag) {
            queryBuilder.andWhere('articles.tagList LIKE :tag', {
                tag: `%${query.tag}%`,
            });
        }

        if (query.author) {
            const author = await this.userRepository.findOne({
                where: { username: query.author },
            });

            queryBuilder.andWhere('articles.authorId = :id', {
                id: author.id,
            });
        }

        if (query.limit) {
            queryBuilder.limit(query.limit);
        }

        if (query.offset) {
            queryBuilder.offset(query.offset);
        }

        const articles = await queryBuilder.getMany();

        return { articles, articlesCount };
    }

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

    async deleteArticle(
        currentUser: UserEntity,
        slug: string,
    ): Promise<DeleteResult> {
        const article = await this.findBySlug(slug);

        if (!article) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }

        if (
            article.author.id !== currentUser.id && currentUser.role !== 'ADMIN'
        ) {
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }

        return await this.articleRepository.delete({ slug });
    }

    async updateArticle(
        currentUser: UserEntity,
        slug: string,
        updateArticleDto: CreateArticleDto,
    ): Promise<ArticleEntity> {
        const article = await this.findBySlug(slug);

        if (!article) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }

        if (
            article.author.id !== currentUser.id && currentUser.role !== 'ADMIN'
        ) {
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }

        if (updateArticleDto.title) {
            article.slug = this.getSlug(updateArticleDto.title);
        }

        Object.assign(article, updateArticleDto);

        return this.articleRepository.save(article);
    }

    async findBySlug(slug: string):Promise<ArticleEntity> {
        const article = this.articleRepository.findOne({ where: { slug } });

        if (!article) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }

        return article;
    }

    buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
        return { article };
    }

    getSlug(title: string): string {
        return `${slugify(title, { lower: true })}-${((Math.random() * 36 ** 6) | 0).toString(36)}`;
    }
}
