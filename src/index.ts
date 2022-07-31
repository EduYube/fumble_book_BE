/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable linebreak-style */
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import apiV1 from './routes/v1';
import connect from './db/connection';

dotenv.config({ path: __dirname + '\\.env' });

const PORT: string = process.env.PORT!;
const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

apiV1(app);

connect().then((connected: boolean) => {
  if (connected) {
    app.listen(PORT, () => {
      console.log('runing on ', PORT);
    });
  } else {
    console.log('Error trying to connect with MongoDB');
  }
});

app.use((req: Request, res: Response) => {
  res.status(400).send(res);
});
