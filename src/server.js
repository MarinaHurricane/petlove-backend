import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import petsRoute from './routes/petsRoute.js';
import newsRoute from './routes/newsRoute.js';
import authRoute from './routes/authRoute.js';
import friendsRoute from './routes/friendsRoute.js';
import locationRoute from './routes/locationRoute.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);



app.use('/api/auth', authRoute);
app.use('/api/pets', petsRoute);
app.use('/api/news', newsRoute);
app.use('/api/friends', friendsRoute);
app.use('/api/cities', locationRoute);

app.use(notFoundHandler);

app.use(errors());

app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

