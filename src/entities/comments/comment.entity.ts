import {
    Column, Entity,
    ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ArticleEntity } from '../articles/article.entity';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'comment' })
export class CommentEntity {
    @PrimaryGeneratedColumn()
        id:number;

    @Column()
        text: string;

    @ManyToOne(() => ArticleEntity, (article) => article.comments)
        article: ArticleEntity;

    @ManyToOne(() => UserEntity, (user) => user.comments)
        author: UserEntity;
}
