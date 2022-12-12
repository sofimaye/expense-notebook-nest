import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JokesService } from './jokes.service';
import { RecordsModule } from '../records/records.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JokesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    // for circular dependency
    forwardRef(() => RecordsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
