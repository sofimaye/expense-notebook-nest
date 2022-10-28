import { IsNotEmpty } from 'class-validator';

export class JokeDto {
  @IsNotEmpty()
  readonly id: number;
  @IsNotEmpty()
  readonly type: string;
  @IsNotEmpty()
  readonly setup: string;
  @IsNotEmpty()
  readonly punchline: string;
}
