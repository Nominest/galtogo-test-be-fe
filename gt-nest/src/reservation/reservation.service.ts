import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReservation, Reservation } from './reservation.schema';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<Reservation>,
  ) {}

  async getReservations({ query }): Promise<IReservation[]> {
    const result = await this.reservationModel
      .find({})
      .populate(['user', 'table'])
      .sort([
        [query.filter, query.isAsc],
        ['time', 'asc'],
      ]);

    return result;
  }

  async getReservationsByDate(date: string): Promise<IReservation[]> {
    const result = await this.reservationModel
      .find({ date })
      .populate(['user', 'table']);
    return result;
  }

  async addReservation(table: CreateReservationDto): Promise<IReservation> {
    const result = await this.reservationModel.create(table);
    return result;
  }

  async updateReservation(id: string, table: UpdateReservationDto) {
    await this.reservationModel.findByIdAndUpdate(id, table).exec();
    return { message: `Reservation updated with id: ${id}` };
  }

  async deleteReservation(id: string) {
    await this.reservationModel.findByIdAndDelete(id).exec();
    return { message: `Reservation deleted with id: ${id}` };
  }

  async updateReservationStatus(id: string, status: string) {
    await this.reservationModel.findByIdAndUpdate(id, { status }).exec();
    const result = await this.reservationModel
      .find()
      .populate(['user', 'table']);
    return { message: `Reservation with id: ${id} status updated`, result };
  }
}
