/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';

const connect = async (): Promise<boolean> => {
  try {
    const uri = process.env.MONGO_URI as string;
    await mongoose.connect(uri);
    return true;
  } catch (e: any) {
    console.log(e.message);
    return false;
  }
};

export default connect;
