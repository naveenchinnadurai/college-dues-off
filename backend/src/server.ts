import dotenv from 'dotenv';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from './db_config/db'
import { users } from './db_config/schema';

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());


app.get('/user', async (req, res) => {
  const allUsers = await db.select().from(users);
  res.json(allUsers);
});

app.post('/user', async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username,email,password)
    try {
      const newUser = await db.insert(users).values({ name:username, email, password }).returning();
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Error creating user ');
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
