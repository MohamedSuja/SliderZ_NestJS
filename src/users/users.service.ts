import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<{ message: string } | null> {
    const isAvailable = await this.userModel.findOne({ email: user.email });

    if (isAvailable) {
      throw new ConflictException('Email already exists');
    } else {
      try {
        const createdItem = new this.userModel(user);
        await createdItem.save();
        return { message: 'User created successfully' };
      } catch (error) {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }
}
