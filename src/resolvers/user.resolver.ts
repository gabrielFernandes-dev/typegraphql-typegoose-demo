import {
  CreateUserInput,
  CreateUserResult,
  LoginInput,
  LoginResult,
  User,
  UserWhereInput,
} from '../schemas/user.schema';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UserService } from '../service/user.service';

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
    @Arg('where', { nullable: true }) userWhereInput: UserWhereInput
  ): Promise<User | User[] | null> {
    if (userWhereInput._id) return this.service.findById(userWhereInput._id);
    if (userWhereInput.email)
      return this.service.findByEmail(userWhereInput.email);
    return this.service.findAllUsers();
  }

  @Mutation(() => User)
  updateUser() {
    return null;
  }

  @Mutation(() => Boolean)
  deleteUser() {
    return false;
  }
}

export default UserResolver;
