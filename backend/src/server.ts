import dotenv from 'dotenv';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import staffRoutes from './routes/staff.routes'
import studentRoutes from './routes/student.routes'

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

//API endpoint routes for CRUD operations
app.use('/staffs', staffRoutes) 
app.use('/students', studentRoutes) 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
