import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { JokeDto } from './dto/joke.dto';

@Injectable()
export class JokesService {
  async getRandomJoke(): Promise<JokeDto> {
    const response = await fetch(
      'https://official-joke-api.appspot.com/random_joke',
    );
    const joke = await response.json();
    return joke as JokeDto;
  }
}
