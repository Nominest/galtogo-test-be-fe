import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Table } from 'src/table/table.schema';
import { User } from 'src/user/user.schema';

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ required: true })
  time: string; // '16:00'

  @Prop({ required: true })
  date: string; // '2023-04-15'

  @Prop({ required: true })
  persons: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
  })
  table: Table;

  @Prop({
    enum: Object.values(ReservationStatus),
    default: ReservationStatus.PENDING,
  })
  status: string;
}
export const ReservationSchema = SchemaFactory.createForClass(Reservation);

export interface IReservation {
  time: string;
  date: string;
  persons: number;
  user: User;
  table: Table;
  status: string;
}
