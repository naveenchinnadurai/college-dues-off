import { Hono } from 'hono';
import { staffLogin, studentLogin } from '../controllers/auth.controller';

const router = new Hono();

router.post('/student-login', studentLogin);
router.get('/staff-login', staffLogin);

export default router;
