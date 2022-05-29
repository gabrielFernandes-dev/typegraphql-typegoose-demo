import { UnlockResult } from '../schemas/unlock.schema';
import { Authorized, Query, Resolver } from 'type-graphql';

@Resolver()
class ProtectedResolver {
  @Authorized()
  @Query(() => UnlockResult)
  unlock(): Promise<UnlockResult> {
    return Promise.resolve({
      success: true,
      result: 'https://gfycat.com/drearyhomelykawala',
    });
  }
}

export default ProtectedResolver;
