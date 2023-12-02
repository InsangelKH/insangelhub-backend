import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { ArticleEntity } from '../articles/article.entity';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/createCommentDto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
    ) {}

    async findCommentsByArticleSlug(slug: string): Promise<CommentEntity[]> {
        const article = await this.findArticleBySlug(slug);

        const { comments } = article;

        return comments;
    }

    async leaveComment(slug: string, crearteCommentDto: UserEntity, commentDto: CreateCommentDto): Promise<CommentEntity> {
        const article = await this.findArticleBySlug(slug);

        const { text } = commentDto;

        const comment = new CommentEntity();
        comment.article = article;
        comment.author = crearteCommentDto;
        comment.text = text;

        return await this.commentRepository.save(comment);
    }

    async updateComment(id: number, currentUser: UserEntity, text: string): Promise<CommentEntity> {
        const comment = await this.findCommentById(id);

        if (comment.author.id !== currentUser.id && currentUser.role !== 'ADMIN') {
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }

        comment.text = text;

        return await this.commentRepository.save(comment);
    }

    async deleteComment(id: number, currentUser: UserEntity): Promise<DeleteResult> {
        const comment = await this.findCommentById(id);

        if (comment.author.id !== currentUser.id && currentUser.role !== 'ADMIN') {
            throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
        }

        return await this.commentRepository.delete({ id });
    }

    async findCommentById(id:number):Promise<CommentEntity> {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['author'],
        });

        if (!comment) {
            throw new HttpException('Comment does not exist', HttpStatus.NOT_FOUND);
        }

        return comment;
    }

    async findArticleBySlug(slug: string): Promise<ArticleEntity> {
        const article = await this.articleRepository.findOne({
            where: { slug },
            relations: ['comments', 'comments.author'],
        });

        if (!article) {
            throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
        }

        return article;
    }
}
