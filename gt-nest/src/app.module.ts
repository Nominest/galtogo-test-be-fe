import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './User/user.controller';
import { UserModule } from './User/user.module';
import { User, UserSchema } from './User/user.schema';
import { UsersService } from './User/user.service';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './reservation/reservation.module';
import { TableModule } from './table/table.module';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationService } from './reservation/reservation.service';
import {
  Reservation,
  ReservationSchema,
} from './reservation/reservation.schema';
import { TableController } from './table/table.controller';
import { TableService } from './table/table.service';
import { Table, TableSchema } from './table/table.schema';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
    UserModule,
    ReservationModule,
    TableModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ReservationController,
    TableController,
  ],

  providers: [AppService, UsersService, ReservationService, TableService],
})
export class AppModule {}
