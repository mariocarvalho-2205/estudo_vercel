import { Router } from 'express';
import { createUser } from "../controller/userController.js";

const router = Router();

// Rotas com prefixo /api (definido no index.js)
router.post('/user/register', createUser);
router.get('/user/test', (req, res) => res.send("API Online"));

export default router;