import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
<<<<<<< HEAD
import fs from 'fs';
import { fileURLToPath } from 'url';
=======
import { fileURLToPath } from 'url';

>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
import conn from './connect.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import upload from 'express-fileupload';
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

<<<<<<< HEAD
const port = process.env.PORT || process.env.VITE_PORT || 5000;
const app  = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Auto-create uploads folder if it doesn't exist ──────────────────────────
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:5000'] }));
app.use(upload({
  limits: { fileSize: 5 * 1024 * 1024 },
  abortOnLimit: true,
  responseOnLimit: 'File size exceeds 5 MB limit',
  useTempFiles: false,
}));

app.use('/uploads', express.static(uploadsDir));
=======
const port = process.env.VITE_PORT || 5000;
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(
  upload({
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    abortOnLimit: true,
    responseOnLimit: 'File size exceeds 5 MB limit',
  })
);

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

<<<<<<< HEAD
// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuild = path.join(__dirname, '..', 'client', 'build');
  app.use(express.static(frontendBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuild, 'index.html'));
  });
}

=======
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
app.use(notFound);
app.use(errorHandler);

conn().then(() => {
<<<<<<< HEAD
  app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });
}).catch(error => {
  console.log('Failed to connect to MongoDB:', error.message);
=======
    app.listen(port, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log(`> Server started on port: ${port}`);
    });
}).catch(error => {
    console.log('Failed to connect to MongoDB', error);
>>>>>>> d622943dd43b7c5375060cca52dbebba4f67b2e6
});
