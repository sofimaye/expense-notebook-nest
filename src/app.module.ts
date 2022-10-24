import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    RecordsModule,
    MongooseModule.forRoot(
      'mongodb+srv://Sofi:SMtop555@cluster0.qptsqvp.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
})
export class AppModule {}
