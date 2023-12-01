import { IsNotEmpty } from 'class-validator';

export class UpdateCommentDto {
    @IsNotEmpty()
        id: number;

    @IsNotEmpty()
        text: string;
}
