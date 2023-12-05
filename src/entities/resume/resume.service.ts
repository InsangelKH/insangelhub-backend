import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { CreateResumeDto } from './dto/CreateResumeDto';
import { ResumeEntity } from './resume.entity';

@Injectable()
export class ResumeService {
    constructor(
        @InjectRepository(ResumeEntity)
        private readonly resumeRepository: Repository<ResumeEntity>,
    ) {}

    async findResumeById(resumeId: number) {
        return await this.resumeRepository.findOne({
            where: { id: resumeId },
        });
    }

    async createResume(
        createResumeDto: CreateResumeDto,
        currentUser: UserEntity,
    ): Promise<ResumeEntity> {
        if (currentUser.role !== 'ADMIN') {
            throw new HttpException('Not Admin', HttpStatus.NOT_ACCEPTABLE);
        }
        const newResume = new ResumeEntity();
        Object.assign(newResume, createResumeDto);
        return await this.resumeRepository.save(newResume);
    }

    async updateResume(
        updateResumeDto: CreateResumeDto,
        resumeId: number,
        currentUser: UserEntity,
    ) {
        if (currentUser.role !== 'ADMIN') {
            throw new HttpException('Not Admin', HttpStatus.NOT_ACCEPTABLE);
        }

        const resume = await this.findResumeById(resumeId);

        if (!resume) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        Object.assign(resume, updateResumeDto);

        return await this.resumeRepository.save(resume);
    }

    async deleteResume(
        resumeId: number,
        currentUser: UserEntity,
    ): Promise<DeleteResult> {
        if (currentUser.role !== 'ADMIN') {
            throw new HttpException('Not Admin', HttpStatus.NOT_ACCEPTABLE);
        }

        const resume = this.findResumeById(resumeId);

        if (!resume) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }

        return await this.resumeRepository.delete({ id: resumeId });
    }
}
