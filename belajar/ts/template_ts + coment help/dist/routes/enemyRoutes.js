import { Router } from 'express';
import EnemyController from '../controllers/enemyController.js';
const router = Router();
router.get('/', EnemyController.getAll);
router.get('/:id', EnemyController.getById);
router.post('/', EnemyController.create);
router.put('/:id', EnemyController.update);
router.delete('/:id', EnemyController.delete);
export default router;
