import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumeEntity } from './resume.entity';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';

@Module({
    imports: [TypeOrmModule.forFeature([ResumeEntity])],
    controllers: [ResumeController],
    providers: [ResumeService],
})
export class ResumeModule {}
