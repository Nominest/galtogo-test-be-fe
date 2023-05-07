import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './reservation/reservation.module';
import { TableModule } from './table/table.module';

import { GoogleLoginModule } from './google-login/google-login.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    ReservationModule,
    TableModule,
    GoogleLoginModule,
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
