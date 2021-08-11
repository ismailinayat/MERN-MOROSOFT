import express from 'express';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';
import userRouter from './routes/userRoutes.js';
import todoRouter from './routes/todoRoutes.js';

import cors from 'cors';


const app = express()

app.use(cors({origin: true, credentials: true}));
//{origin: true, credentials: true })

app.use(express.static(`${process.cwd()}/public`))
app.use(express.json())
app.use(cookieParser())



app.use('/api/users', userRouter);
app.use('/api/todos', todoRouter);

app.all('*', (req, res, next) => {

   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler)

export default app;
