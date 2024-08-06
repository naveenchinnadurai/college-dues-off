import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';
import staffRoutes from './routes/staff.routes';
import studentRoutes from './routes/student.routes';
import { serve } from '@hono/node-server';

dotenv.config();

const app = new Hono();
const PORT = Number(process.env.SERVER_PORT) || 3000;

// Apply CORS middleware globally
app.use('*', cors());

// Root endpoint
app.get('/', (c: Context) => {
  return c.json({ greet: "Hello World" });
});

// API endpoint routes for CRUD operations
app.route('/staffs', staffRoutes);
app.route('/students', studentRoutes);

// Create and start the server
serve({
  fetch: app.fetch,
  port: PORT,
});
