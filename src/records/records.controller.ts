import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordsService } from './records.service';
import { Record } from './schemas/record.schema';

//переробити класи на функції для подальшого використання
//використовувати хуки
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
  @Put(':id')
  update(
    @Body() updateRecordDto: UpdateRecordDto,
    @Param('id') id: string,
  ): Promise<Record> {
    return this.recordsService.update(id, updateRecordDto);
  }
}
