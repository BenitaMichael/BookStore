import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import storiesRoute from './routes/storiesRoute.js';
import commentRoute from './routes/commentRoute.js';
import cookieParser from 'cookie-parser';
import path from 'path'

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log(err);
    });

    const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/story', storiesRoute);
app.use('/api/comment', commentRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})