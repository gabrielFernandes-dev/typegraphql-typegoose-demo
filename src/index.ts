import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { resolvers } from './resolvers';
import Context from './types/context';
import { connectToMongo } from './utils/mongo';
import { authChecker } from './auth-checker';

async function main() {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      authChecker,
    }),
    context: (ctx: Context) => {
      const { authorization } = ctx.req.headers;
      if (authorization) {
        ctx.authToken = authorization.split(' ')[1];
      }
      return ctx;
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  connectToMongo(process.env.DATABASE_URI);

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server awaiting for incoming requests on http://localhost:4000/graphql`
    )
  );
}

main();
