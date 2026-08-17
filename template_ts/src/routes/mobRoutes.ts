import { Router } from 'express';
import MobController from '../controllers/mobController';

const router = Router();

router.get('/', MobController.getAll);
router.get('/:id', MobController.getById);
router.post('/', MobController.create);
router.put('/:id', MobController.update);
router.delete('/:id', MobController.delete);

export default router;