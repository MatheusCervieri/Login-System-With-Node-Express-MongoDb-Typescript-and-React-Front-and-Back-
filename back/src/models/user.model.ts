import { Document, Schema, model } from 'mongoose';

interface User extends Document {
  email: string;
  password: string;
}

/*
In the context of Mongoose and MongoDB, a schema is a blueprint for defining the structure of a document in a collection. It defines the fields and their types, validation rules, and other options for the documents in that collection.
*/

const UserSchema = new Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = model<User>('User', UserSchema);

/*In summary, a schema is a definition of the structure of documents in a collection, while a model is a constructor function that creates instances of documents that match that schema, 
and provides methods for interacting with the database.
*/

export default UserModel;