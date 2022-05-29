import {
  defaultClasses,
  getModelForClass,
  index,
  pre,
  prop,
  queryMethod,
  ReturnModelType,
} from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import { IsEmail, MinLength } from 'class-validator';
import { Field, ID, InputType, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email });
}

interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
export class User extends defaultClasses.TimeStamps {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String, { nullable: false })
  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @Field(() => String, { nullable: true })
  @prop({ required: false })
  phoneNumber: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  name: string;

  @IsEmail()
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  @MinLength(6, { message: 'password must be at least 6 characters long' })
  password: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID, { nullable: false })
  _id: ObjectId;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  phoneNumber: string;
}

@InputType()
export class LoginInput {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@ObjectType()
export class LoginResult {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  expiresIn: string;
}

@ObjectType()
export class CreateUserResult {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  expiresIn: string;
}

@InputType()
export class UserWhereInput {
  @Field(() => ID, { nullable: false })
  _id: string;

  @Field(() => String, { nullable: true })
  email: string;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);
