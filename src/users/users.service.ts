import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JokesService } from './jokes.service';
import { UserAndJokeDto } from './dto/user-joke.dto';
import { JokeDto } from './dto/joke.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Inject(JokesService)
  private readonly jokesService: JokesService;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
  // get userById, get random joke and combine them
  async findUserWithJoke(id: string): Promise<UserAndJokeDto> {
    const joke = await this.jokesService.getRandomJoke();
    const user = await this.userModel.findById(id);
    return {
      joke,
      user,
    };
  }
  async findUserWithJokeParallel(id: string): Promise<UserAndJokeDto> {
    const combinedPromise: Promise<(JokeDto | User)[]> = Promise.all([
      this.jokesService.getRandomJoke(),
      this.userModel.findById(id),
    ]);
    const jokeAndUser: (JokeDto | User)[] = await combinedPromise;
    const joke = jokeAndUser[0] as JokeDto;
    const user = jokeAndUser[1] as User;
    return {
      joke,
      user,
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }
}
