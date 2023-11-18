import { IsNotEmpty } from 'class-validator';
import { ArticleType, BlockType } from '../types/articleEntityTypes';

export class CreateArticleDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly subtitle: string;

    readonly image: string;

    @IsNotEmpty()
    readonly type: ArticleType[];

    @IsNotEmpty()
    readonly blocks: BlockType[];
}
