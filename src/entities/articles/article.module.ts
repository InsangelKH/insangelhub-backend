import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comments/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity, CommentEntity])],
    controllers: [ArticleController],
    providers: [ArticleService],
})
export class ArticleModule {}
