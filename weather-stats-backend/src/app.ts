import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
// import { connectToDb } from './utilities/dbConnection';
import { authRouter } from './routes/authRoutes'
import {movieRouter} from './routes/movieRoutes'
import { weatherRouter } from './routes/weatherRoutes';

dotenv.config()
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

const port = process.env.port || 8091;

app.listen(port, async () => {
  console.log(`server started on port ${port}`);
  // await connectToDb(process.env.DBURI);
})

app.use('/auth', authRouter)
app.use('/movie', movieRouter)
app.use('/weather', weatherRouter)