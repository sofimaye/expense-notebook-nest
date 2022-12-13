import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { JokesService } from './jokes.service';
import { UserAndJokeDto } from './dto/user-joke.dto';
import { JokeDto } from './dto/joke.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Inject(JokesService)
  private readonly jokesService: JokesService;

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    this.logger.info(`New user created: ${newUser.userName}`);
    return newUser.save();
  }
  // get userById, get random joke and combine them
  async findUserWithJoke(id: string): Promise<UserAndJokeDto> {
    const joke = await this.jokesService.getRandomJoke();
    const user = await this.userModel.findById(id);
    this.logger.info(`Fetched: ${user.userName} and joke`, joke);
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
    const users = this.userModel.find().exec();
    this.logger.info(`All users: ${users}`);
    return users;
  }

  async findOne(id: string): Promise<User | null> {
    const user = this.userModel.findById(id);
    this.logger.info(`Found user: ${user}`);
    return user;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const user = this.userModel.findOne({ userName });
    this.logger.info(`Found user: ${user}`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    this.logger.info(`Updated user's info: ${updatedUser}`);
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const removeUser = this.userModel.findByIdAndRemove(id);
    this.logger.info(`Removed user: ${removeUser}`);
    return removeUser;
  }
}
