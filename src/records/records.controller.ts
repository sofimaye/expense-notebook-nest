import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordsService } from './records.service';
import { Record } from './schemas/record.schema';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}
  @Get()
  getAll(): Promise<Record[]> {
    return this.recordsService.getAll();
  }
  @Get(':id')
  getById(@Param('id') id: string): Promise<Record> {
    return this.recordsService.getById(id);
  }
  @Post()
  create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordsService.create(createRecordDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Record> {
    return this.recordsService.remove(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
  ): Promise<Record> {
    return this.recordsService.update(id, updateRecordDto);
  }
}
