import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connectionInstances = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(
      'Successfully connected to the DB !!!',
      connectionInstances.connection._connectionString
    );
  } catch (error) {
    console.log(`ERR while connecting to the DB !!!`, error);
  }
};
