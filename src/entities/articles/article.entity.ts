import {
    BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleType, BlockType } from './types/articleEntityTypes';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comments/comment.entity';

@Entity({ name: 'articles' })
export class ArticleEntity {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        slug:string;

    @Column()
        title: string;

    @Column()
        subtitle: string;

    @Column({ default: 'default-article.jpg' })
        image: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        updatedAt: Date;

    @Column('simple-array')
        type: ArticleType[];

    @Column('jsonb', { nullable: true })
        blocks: BlockType[];

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    }

    @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
        author: UserEntity;

    @OneToMany(() => CommentEntity, (comment) => comment.article)
        comments: CommentEntity[];
}
