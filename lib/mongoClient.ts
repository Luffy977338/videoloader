import { MongoClient } from "mongodb";

const URI = process.env.DATABASE_MONGODB_URI;
const options = {};

if (!URI) throw new Error("Please add your Mongo URI to .env.local");

let client = new MongoClient(URI, options);
let clientPromise: any;

if (process.env.NODE_ENV !== "production") {
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }

  clientPromise = (global as any)._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
