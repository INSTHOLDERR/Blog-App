import mongoose from 'mongoose';

export default function conn() {
  return mongoose.connect(process.env.DB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
}
