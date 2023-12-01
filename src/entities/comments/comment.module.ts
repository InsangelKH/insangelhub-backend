import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { ArticleEntity } from '../articles/article.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity, ArticleEntity])],
    controllers: [CommentController],
    providers: [CommentService],
})
export class CommentModule {}
