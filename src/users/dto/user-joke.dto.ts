import { IsNotEmpty } from 'class-validator';
import { JokeDto } from './joke.dto';
import { User } from '../schemas/user.schema';

export class UserAndJokeDto {
  @IsNotEmpty()
  readonly user: User;
  @IsNotEmpty()
  readonly joke: JokeDto;
}
