import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from './schemas/record.schema';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [RecordsService],
  controllers: [RecordsController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Record.name,
        schema: RecordSchema,
      },
    ]),
    UsersModule,
  ],
})
export class RecordsModule {}
