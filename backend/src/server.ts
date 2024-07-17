import dotenv from 'dotenv';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import staffRouters from './routes/staffRoutes'

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/staffs', staffRouters) //API endpoint routes for staffs CRUD operations

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
