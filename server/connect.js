import mongoose from 'mongoose';

export default function conn() {
<<<<<<< HEAD
  return mongoose.connect(process.env.DB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });
=======
    return mongoose.connect(process.env.DB_URI);
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
}
