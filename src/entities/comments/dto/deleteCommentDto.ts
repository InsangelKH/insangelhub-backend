import { IsNotEmpty } from 'class-validator';

export class DeleteCommentDto {
    @IsNotEmpty()
        id: number;
}
