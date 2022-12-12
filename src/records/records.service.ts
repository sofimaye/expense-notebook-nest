import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record, RecordDocument } from './schemas/record.schema';
import { UsersService } from '../users/users.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
    // add a UsersService to have access to userId
    @Inject(UsersService)
    private readonly userService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getAll(): Promise<Record[]> {
    const records = this.recordModel.find().exec();
    this.logger.info(`Records: ${records}`);
    return records;
  }
  //get all records by user_id
  async getAllRecordsByUserId(userId: string): Promise<Record[]> {
    const user = await this.userService.findOne(userId);
    if (!user) throw new Error(`User not found: ${userId}`);

    return this.recordModel.find({ userId });
  }

  async getById(id: string): Promise<Record> {
    const oneRecord = this.recordModel.findById(id);
    this.logger.info(`Got one record from id: ${oneRecord}`);
    return oneRecord;
  }

  async create(recordDto: CreateRecordDto): Promise<Record> {
    const user = await this.userService.findOne(recordDto.userId);
    if (!user) throw new Error(`User not found: ${recordDto.userId}`);

    const newRecord = new this.recordModel(recordDto);
    this.logger.info(`New record: ${newRecord}`);
    return newRecord.save();
  }

  async remove(id: string): Promise<Record> {
    const removedRecord = this.recordModel.findByIdAndRemove(id);
    this.logger.info(`Removed record: ${removedRecord}`);
    return removedRecord;
  }
  async update(id: string, recordDto: UpdateRecordDto): Promise<Record> {
    const updatedRecord = this.recordModel.findByIdAndUpdate(id, recordDto, {
      new: true,
    });
    this.logger.info(`Updated record's info ${updatedRecord}`);
    return updatedRecord;
  }
}
