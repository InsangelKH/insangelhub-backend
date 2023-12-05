import { IsNotEmpty } from 'class-validator';

export class CreateResumeDto {
    @IsNotEmpty()
    readonly phone: string;

    @IsNotEmpty()
    readonly mail: string;

    @IsNotEmpty()
    readonly telegram: string;

    @IsNotEmpty()
    readonly skills: string[];

    readonly languages: string[];

    @IsNotEmpty()
    readonly summary: string;
}
