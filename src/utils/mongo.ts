import mongoose from 'mongoose';

export async function connectToMongo(uri: string = 'mongodb://localhost:27017/gym_collection') {
  try {
    await mongoose.connect(uri, {
      autoCreate: true,
      dbName: 'type-graphql_typegoose_demo-db'
    });
    console.log('Connected to Database');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
