import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Record, RecordDocument } from './schemas/record.schema';
import { Model } from 'mongoose';
import { UpdateRecordDto } from './dto/update-record.dto';

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
  async create(recordDto: CreateRecordDto) {
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
