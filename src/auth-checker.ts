import jwt from 'jsonwebtoken';
import { AuthChecker, UnauthorizedError } from 'type-graphql';
import { User } from './schemas/user.schema';
import Context from './types/context';

const secret = process.env.JWT_ACCESS_SECRET as string;

export const authChecker: AuthChecker<Context> = ({ context }) => {
  try {
    if (context.authToken) {
      const isValid = jwt.verify(context.authToken, secret) as User;
      return Object.keys(isValid).length && Boolean(isValid) ? true : false;
    }
  } catch (err) {
    console.log(err);
    if (err.message.match(/invaid signature/i)) throw new UnauthorizedError();
  }

  return false;
};
