import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { resolvers } from './resolvers';
import Context from './types/context';
import { connectToMongo } from './utils/mongo';

async function main() {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers,
    }),
    context: (ctx: Context) => {
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
