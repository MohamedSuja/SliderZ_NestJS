import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthAdmin>;

@Schema({
  collection: 'admin',
})
export class AuthAdmin {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthAdmin);
