// import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { PhoneVerificationService } from './phone-verification.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private phoneVerificationService: PhoneVerificationService) {}

//   @Post('send-otp')
//   async sendOtp(@Req() req: any) {
//     const { code, sid } = await this.phoneVerificationService.sendOtp(
//       req.body.phoneNumber,
//     );
//     return { code, sid };
//   }

//   // ...
// }
