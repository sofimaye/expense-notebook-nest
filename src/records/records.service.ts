import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record, RecordDocument } from './schemas/record.schema';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}
  async getAll(): Promise<Record[]> {
    return this.recordModel.find().exec();
  }
  async getById(id: string): Promise<Record> {
    return this.recordModel.findById(id);
  }
  async create(recordDto: CreateRecordDto): Promise<Record> {
    const newRecord = new this.recordModel(recordDto);
    //check if such user exists (validation)
    return newRecord.save();
  }
  async remove(id: string): Promise<Record> {
    return this.recordModel.findByIdAndRemove(id);
  }
  async update(id: string, recordDto: UpdateRecordDto): Promise<Record> {
    return this.recordModel.findByIdAndUpdate(id, recordDto, { new: true });
  }
}
