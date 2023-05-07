import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Request as Req,
  Response as Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { getAccessTokenFromCode } from './getAccessTokenFromCode';
import { getGoogleUserInfo } from './getGoogleUserInfo';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../User/user.service';
import { User } from '../User/user.schema';
import * as queryString from 'query-string';

@Controller()
export class GoogleLoginController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Get('google-login')
  googleLogin() {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.CLIENT_ID,
      redirect_uri: `http://localhost:${process.env.PORT}/google/callback`,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ].join(' '),
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent',
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
  }

  @Get('google/callback')
  async verifyGoogle(@Req() req: Request, @Res() res: Response) {
    const { code } = req.query;
    console.log('first');
    if (!code) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    const accessToken = await getAccessTokenFromCode(code);
    if (!accessToken)
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

    const profile: any = await getGoogleUserInfo(accessToken);
    console.log(profile);

    let user = await this.usersService.findByEmail(profile.email);

    if (!user) {
      const userInput: User = {
        email: profile.email,
        firstName: profile.given_name,
        lastName: profile.family_name,
        phone: null,
      };
      user = await this.usersService.addUser(userInput);
    }

    const payload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user?.phone,
    };
    const token = this.jwtService.sign(payload);
    res
      .status(200)
      .cookie('token', token)
      .redirect(`http://localhost:3000/phone-verify`);
  }
}

// import {
//   Controller,
//   Get,
//   HttpException,
//   HttpStatus,
//   Request as Req,
//   Response as Res,
// } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { getAccessTokenFromCode } from './getAccessTokenFromCode';
// import { getGoogleUserInfo } from './getGoogleUserInfo';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from '../User/user.service';
// import { User } from '../User/user.schema';
// import * as queryString from 'query-string';

// @Controller()
// export class GoogleLoginController {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly usersService: UserService,
//   ) {}

//   @Get('google-login')
//   googleLogin() {
//     const stringifiedParams = queryString.stringify({
//       client_id: process.env.CLIENT_ID,
//       redirect_uri: `http://localhost:${process.env.PORT}/google/callback`,
//       scope: [
//         'https://www.googleapis.com/auth/userinfo.email',
//         'https://www.googleapis.com/auth/userinfo.profile',
//       ].join(' '),
//       response_type: 'code',
//       access_type: 'offline',
//       prompt: 'consent',
//     });

//     return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
//   }

//   @Get('google/callback')
//   async verifyGoogle(@Req() req: Request, @Res() res: Response) {
//     const { code } = req.query;
//     console.log('first');
//     if (!code) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

//     const accessToken = await getAccessTokenFromCode(code);
//     if (!accessToken)
//       throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

//     const profile: any = await getGoogleUserInfo(accessToken);
//     console.log(profile);

//     let user = await this.usersService.findByEmail(profile.email);

//     if (!user) {
//       const userInput: User = {
//         email: profile.email,
//         firstName: profile.given_name,
//         lastName: profile.family_name,
//         phone: null,
//       };
//       user = await this.usersService.addUser(userInput);
//     }

//     if (!user.phone) {
//       // If the user doesn't have phone information, redirect to phone-inserting component
//       return res.redirect(`http://localhost:3000/phone-inserting`);
//     }

//     const payload = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user?.phone,
//     };
//     const token = this.jwtService.sign(payload);
//     res.status(200).cookie('token', token).redirect(`http://localhost:3000`);
//   }
// }
