import Context from '../types/context';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';

@Resolver()
class HelloWorlResolver {
  @Query(() => String)
  hello(
    @Ctx() _ctx: Context,
    @Arg('name', { nullable: true }) name: string
  ): string {
    return `Hello ${name || 'world'}`;
  }
}

export default HelloWorlResolver;
