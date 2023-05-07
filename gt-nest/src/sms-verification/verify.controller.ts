// import { Controller, Post, Body } from '@nestjs/common';
// import axios from 'axios';

// @Controller('verify')
// export class VerifyController {
//   @Post('send-code')
//   async sendVerificationCode(@Body() body: { phoneNumber: string }) {
//     const twilioUrl =
//       'https://verify.twilio.com/v2/Services/YOUR_SERVICE_SID/Verifications';
//     const twilioAccountSid = 'YOUR_ACCOUNT_SID';
//     const twilioAuthToken = 'YOUR_AUTH_TOKEN';

//     try {
//       const response = await axios.post(
//         twilioUrl,
//         {
//           To: body.phoneNumber,
//           Channel: 'sms',
//         },
//         {
//           auth: {
//             username: twilioAccountSid,
//             password: twilioAuthToken,
//           },
//         },
//       );

//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

//   @Post('check-code')
//   async checkVerificationCode(
//     @Body() body: { phoneNumber: string; code: string },
//   ) {
//     const twilioUrl =
//       'https://verify.twilio.com/v2/Services/YOUR_SERVICE_SID/VerificationCheck';
//     const twilioAccountSid = 'YOUR_ACCOUNT_SID';
//     const twilioAuthToken = 'YOUR_AUTH_TOKEN';

//     try {
//       const response = await axios.post(
//         twilioUrl,
//         {
//           To: body.phoneNumber,
//           Code: body.code,
//         },
//         {
//           auth: {
//             username: twilioAccountSid,
//             password: twilioAuthToken,
//           },
//         },
//       );

//       return response.data;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }
// }
