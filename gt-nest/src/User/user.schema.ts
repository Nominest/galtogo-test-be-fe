import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  email: string;

  @Prop()
  phone: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface IUser {
  lastName: string;
  firstName: string;
  email: string;
  phone: number;
}
