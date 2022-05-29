import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UnlockResult {
  @Field(() => Boolean)
  success: boolean;
  
  @Field(() => String)
  result: string;
}
