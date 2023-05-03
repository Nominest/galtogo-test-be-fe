import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUser(): Promise<IUser[]> {
    const result = await this.userModel.find().exec();
    return result;
  }

  async addUser(user: User) {
    const newUser = new this.userModel(user);
    const result = await newUser.save();
    return result;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async updateUser(id: string, user: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, user).exec();
    return { message: `User updated with id: ${id}` };
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
    return { message: `User deleted with id: ${id}` };
  }
}
