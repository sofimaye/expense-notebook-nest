import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordsService } from './records.service';
import { Record } from './schemas/record.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}
  @Get()
  getAll(): Promise<Record[]> {
    return this.recordsService.getAll();
  }
  @Get(':id')
  getById(@Param('id') id: string): Promise<Record | string> {
    return this.recordsService.getById(id).catch(() => 'record is not exist');
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createRecordDto: CreateRecordDto,
    @Request() req,
  ): Promise<Record> {
    return this.recordsService.create(req.user.userId, createRecordDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Record> {
    return this.recordsService.remove(id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
    @Request() req,
  ): Promise<Record> {
    return this.recordsService.update(id, req.user.userId, updateRecordDto);
  }
}
