import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  // getUsers(): object {
  //   throw new Error('Method not implemented.');
  // }
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // getUsers(): object {
  //   return this.userModel.find().exec();
  // }

  // users = [];

  // create(user: User) {
  //   this.users.push(user);
  //   return this.users;
  // }
  findAll(): object {
    return this.userModel.find().exec();
  }
}
