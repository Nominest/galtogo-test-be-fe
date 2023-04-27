import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { TableService } from './table.service';
import { UpdateTableDto } from './dto/update-table.dto';
import { ITable } from './table.schema';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}
  @Get()
  getAll(): Promise<ITable[]> {
    return this.tableService.getTables();
  }

  @Post('add')
  addTable(@Body() table: CreateTableDto): Promise<ITable> {
    return this.tableService.addTable(table);
  }

  @Patch(':id')
  updateTable(@Param('id') id: string, @Body() table: UpdateTableDto) {
    return this.tableService.updateTable(id, table);
  }

  @Delete(':id')
  deleteTable(@Param('id') id: string) {
    return this.tableService.deleteTable(id);
  }
}
