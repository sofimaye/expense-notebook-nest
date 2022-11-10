import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsModule } from './records/records.module';
import { UsersModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    RecordsModule,
    MongooseModule.forRoot(
      `mongodb+srv://Sofi:${process.env.DATABASE_PASSWORD}@cluster0.qptsqvp.mongodb.net/?retryWrites=true&w=majority`,
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
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
