import { Router } from 'express';
const router = Router();

// Rotas explícitas sem parâmetros dinâmicos
router.post('/user/register', (req, res, next) => {
  userController.createUser(req, res).catch(next);
});

router.get('/user/test', (req, res) => {
  res.send("Chegou");
});

export default router;