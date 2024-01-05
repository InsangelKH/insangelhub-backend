import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/data-source';
import { UserModule } from './entities/user/user.module';
import { AuthMiddleware } from './entities/user/middleware/auth.middleware';
import { ArticleModule } from './entities/articles/article.module';
import { CommentModule } from './entities/comments/comment.module';
import { ResumeModule } from './entities/resume/resume.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        UserModule,
        ArticleModule,
        CommentModule,
        ResumeModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }
}
