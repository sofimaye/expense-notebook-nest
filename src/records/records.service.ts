import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record, RecordDocument } from './schemas/record.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  // add a UsersService to have access to userId
  @Inject(UsersService)
  private readonly userService: UsersService;

  async getAll(): Promise<Record[]> {
    return this.recordModel.find().exec();
  }

  async getById(id: string): Promise<Record> {
    return this.recordModel.findById(id);
  }

  async create(recordDto: CreateRecordDto): Promise<Record> {
    const user = await this.userService.findOne(recordDto.userId);
    if (!user) throw new Error(`User not found: ${recordDto.userId}`);

    const newRecord = new this.recordModel(recordDto);
    return newRecord.save();
  }

  async remove(id: string): Promise<Record> {
    return this.recordModel.findByIdAndRemove(id);
  }
  async update(id: string, recordDto: UpdateRecordDto): Promise<Record> {
    return this.recordModel.findByIdAndUpdate(id, recordDto, { new: true });
  }
}
