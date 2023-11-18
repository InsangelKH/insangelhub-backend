import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './entities/user/user.module';
import { AuthMiddleware } from './entities/user/middleware/auth.middleware';
import { ArticleModule } from './entities/articles/article.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(dataSourceOptions),
        UserModule,
        ArticleModule,
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
