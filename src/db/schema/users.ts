import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  data: {
    email: string;
    first_name: string;
    last_name: string;
    alias: string;
    password: string;
  };
}

const schema = new Schema({
  data: {
    email: { type: String, unique: true, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    alias: { type: String, required: true },
    password: { type: String, required: true },
  },
});

const Users = model<User>('user', schema);

export default Users;
