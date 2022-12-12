import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Record } from '../records/schemas/record.schema';
import { UserAndJokeDto } from './dto/user-joke.dto';
import { RecordsService } from '../records/records.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Inject(forwardRef(() => RecordsService))
  private readonly recordService: RecordsService;

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id/records')
  getAllRecordsByUserId(@Param('id') id: string): Promise<Record[]> {
    return this.recordService.getAllRecordsByUserId(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | string> {
    return this.usersService.findOne(id).catch(() => 'id is not exist');
  }

  //path for user with joke
  @Get(':id/joke')
  getUserWithJoke(@Param('id') id: string): Promise<UserAndJokeDto> {
    return this.usersService.findUserWithJoke(id);
  }
  @Get(':id/joke/parallel')
  getUserWithJokeParallel(@Param('id') id: string): Promise<UserAndJokeDto> {
    return this.usersService.findUserWithJokeParallel(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
