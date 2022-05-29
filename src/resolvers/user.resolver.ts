import {
  CreateUserInput,
  CreateUserResult,
  LoginInput,
  LoginResult,
  User,
  UserWhereInput,
} from '../schemas/user.schema';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { UserService } from '../service/user.service';
import Context from 'src/types/context';

@Resolver(User)
class UserResolver {
  constructor(private service: UserService) {
    this.service = new UserService();
  }

  @Mutation(() => CreateUserResult)
  register(
    @Arg('input', { nullable: false }) input: CreateUserInput
  ): Promise<CreateUserResult> {
    return this.service.createUser(input);
  }

  @Mutation(() => LoginResult)
  login(
    @Arg('input', { nullable: false }) input: LoginInput
  ): Promise<LoginResult> {
    return this.service.login(input);
  }

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.service.findAllUsers();
  }

  @Query(() => User)
  user(
    @Arg('where', { nullable: false }) userWhereInput: UserWhereInput
  ): Promise<User | null> {
    if (userWhereInput?._id) return this.service.findById(userWhereInput._id);
    if (userWhereInput?.email)
      return this.service.findByEmail(userWhereInput.email);
    return Promise.resolve(null);
  }

  @Mutation(() => User)
  updateUser() {
    return null;
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Arg('where', { nullable: false }) userWhereInput: UserWhereInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    return this.service.deleteUser(userWhereInput._id, ctx);
  }
}

export default UserResolver;
