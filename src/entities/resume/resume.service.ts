import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResumeEntity } from './resume.entity';

@Injectable()
export class ResumeService {
    constructor(
        @InjectRepository(ResumeEntity)
        private readonly resumeRepository: Repository<ResumeEntity>,
    ) {}
}
