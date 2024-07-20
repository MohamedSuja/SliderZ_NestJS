import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<{ message: string } | null> {
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(user.password, salt);

    const isAvailable = await this.userModel.findOne({ email: user.email });

    if (isAvailable) {
      throw new ConflictException('Email already exists');
    } else {
      try {
        const createdItem = new this.userModel({
          ...user,
          password: hashedPass,
        });
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
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('Please provide a valid email');
    }
    return user;
  }
}
