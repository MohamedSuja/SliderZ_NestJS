import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  versionKey: false,
  toJSON: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password;
    },
  },
  toObject: {
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.password;
    },
  },
})
export class User {
  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
