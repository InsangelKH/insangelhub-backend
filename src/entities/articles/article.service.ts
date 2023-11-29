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

        if (query.sortBy && query.sort) {
            const direction = query.sort.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
            queryBuilder.orderBy(`articles.${query.sortBy}`, direction);
        }

        if (query.type) {
            queryBuilder.andWhere('articles.type LIKE :type', {
                type: `%${query.type}%`,
            });
        }

        if (query.search) {
            queryBuilder.andWhere((qb) => {
                qb.where('articles.title LIKE :search OR articles.subtitle LIKE :search', {
                    search: `%${query.search}%`,
                });

                qb.orWhere('articles.type::text LIKE :search', {
                    search: `%${query.search}%`,
                });

                qb.orWhere('jsonb_typeof(articles.blocks) = \'array\' AND EXISTS (SELECT 1 FROM jsonb_array_elements(articles.blocks) AS block WHERE block->>\'type\' = \'TEXT\' AND block->>\'paragraphs\' LIKE :search)', {
                    search: `%${query.search}%`,
                });

                qb.orWhere('jsonb_typeof(articles.blocks) = \'array\' AND EXISTS (SELECT 1 FROM jsonb_array_elements(articles.blocks) AS block WHERE block->>\'type\' = \'CODE\' AND block->>\'code\' LIKE :search)', {
                    search: `%${query.search}%`,
                });
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
        const articlesCount = await queryBuilder.getCount();

        return { articles, articlesCount };
    }

    async createArticle(
        currentUser: UserEntity,
        createArticleDto: CreateArticleDto,
        images?: Express.Multer.File[],
    ): Promise<ArticleEntity> {
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto);

        if (images) {
            images.forEach((image) => {
                if (image.originalname === createArticleDto.image) {
                    article.image = image.filename;
                }
                article.blocks.forEach((block) => {
                    if (block.type === 'IMAGE' && block.src === image.originalname) {
                        block.src = image.filename;
                    }
                });
            });
        }

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
        const article = await this.articleRepository.findOne({ where: { slug } });

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
