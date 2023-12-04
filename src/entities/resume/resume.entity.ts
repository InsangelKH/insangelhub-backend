import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'resume' })
export class ResumeEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        phone: string;

    @Column()
        mail: string;

    @Column()
        telegram: string;

    @Column('simple-array')
        skills: string[];

    @Column('simple-array')
        languages: string[];

    @Column()
        summary: string;
}
