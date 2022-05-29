import HelloWorlResolver from './hello-world.resolver';
import ProtectedResolver from './protected.resolver';
import UserResolver from './user.resolver';

export const resolvers = [
  HelloWorlResolver,
  UserResolver,
  ProtectedResolver,
] as const;
