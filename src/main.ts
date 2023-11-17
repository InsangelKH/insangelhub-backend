import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join('C:/Users/Ibragim/Desktop/проекты/InsangelHub/insangelhub-backend/public'));

    app.enableCors({
        origin: '*',
        allowedHeaders: '*',
        methods: '*',
    });

    await app.listen(3000);
}
bootstrap();
