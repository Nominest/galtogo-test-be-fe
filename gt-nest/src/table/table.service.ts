import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ITable, Table } from './table.schema';
import { Model } from 'mongoose';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
  constructor(@InjectModel(Table.name) private tableModel: Model<Table>) {}

  async getTables(): Promise<ITable[]> {
    const result = await this.tableModel.find().exec();
    return result;
  }

  async addTable(table: CreateTableDto): Promise<ITable> {
    const result = await this.tableModel.create(table);
    return result;
  }

  async updateTable(id: string, table: UpdateTableDto) {
    await this.tableModel.findByIdAndUpdate(id, table).exec();
    return { message: `Table updated with id: ${id}` };
  }

  async deleteTable(id: string) {
    await this.tableModel.findByIdAndDelete(id).exec();
    return { message: `Table deleted with id: ${id}` };
  }
}
