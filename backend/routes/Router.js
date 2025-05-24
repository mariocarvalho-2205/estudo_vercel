import { Router } from 'express';
import { createUser } from "../controller/userController.js";

const router = Router();

// Rotas explícitas sem parâmetros dinâmicos
router.post('/register', createUser);
router.get('/test', (req, res) => res.send("API Online"));

export default router;