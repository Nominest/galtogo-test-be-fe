// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import * as Twilio from 'twilio';

// @Injectable()
// export class PhoneVerificationService {
//   private readonly twilio: Twilio.Twilio;

//   constructor(private configService: ConfigService) {
//     this.twilio = Twilio(
//       configService.get('TWILIO_ACCOUNT_SID'),
//       configService.get('TWILIO_AUTH_TOKEN'),
//     );
//   }

//   async sendOtp(phoneNumber: string) {
//     const code = Math.floor(100000 + Math.random() * 900000);
//     const message = `Your verification code is ${code}.`;
//     const response = await this.twilio.messages.create({
//       body: message,
//       to: phoneNumber,
//       from: this.configService.get('TWILIO_PHONE_NUMBER'),
//     });
//     return { code, sid: response.sid };
//   }
// }
