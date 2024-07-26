import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log(err);
    });

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute)

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})