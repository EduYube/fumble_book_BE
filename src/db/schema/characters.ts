import { Schema, model, Document, ObjectId } from 'mongoose';
import { User } from './users';

export interface Character extends Document {
  data: {
    name: string;
    race: string;
    charclass: string;
    level: number;
    user: ObjectId | User;
  };
}

const schema = new Schema({
  data: {
    name: { type: String, required: true },
    race: { type: String, required: false },
    charclass: { type: String, required: false },
    level: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
});

const Characters = model<Character>('character', schema);

export default Characters;
