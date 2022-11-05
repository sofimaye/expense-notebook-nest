import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsModule } from './records/records.module';
import { UsersModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

@Module({
  imports: [
    RecordsModule,
    MongooseModule.forRoot(
      'mongodb+srv://Sofi:SMtop555@cluster0.qptsqvp.mongodb.net/?retryWrites=true&w=majority',
    ),
    UsersModule,
    WinstonModule.forRoot({
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.simple(),
      ),
      transports: [
        new transports.Console({ level: 'debug' }),
        new transports.File({ filename: 'debug.log', level: 'debug' }),
      ],
    }),
  ],
})
export class AppModule {}
