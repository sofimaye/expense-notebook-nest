import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//to update parameters from user
export class UpdateUserDto extends PartialType(CreateUserDto) {}
