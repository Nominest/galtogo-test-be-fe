import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Patch,
  Post,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { IReservation } from './reservation.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @Get()
  getReservation(
    @Query() query: { filter: string; isAsc: string },
  ): Promise<IReservation[]> {
    console.log(query);
    return this.reservationService.getReservations({ query });
  }

  @Get('date/:date')
  getReservationsByDate(@Param('date') date: string): Promise<IReservation[]> {
    return this.reservationService.getReservationsByDate(date);
  }

  @Post('add')
  addReservation(
    @Body() reservation: CreateReservationDto,
  ): Promise<IReservation> {
    return this.reservationService.addReservation(reservation);
  }

  @Patch(':id')
  updateReservation(
    @Param('id') id: string,
    @Body() reservation: UpdateReservationDto,
  ) {
    return this.reservationService.updateReservation(id, reservation);
  }

  @Delete(':id')
  deleteReservation(@Param('id') id: string) {
    return this.reservationService.deleteReservation(id);
  }

  @Patch(':id/confirm')
  confirmReservation(@Param('id') id: string, @Query('status') status: string) {
    console.log('params: ', status);
    return this.reservationService.updateReservationStatus(id, status);
  }
}
