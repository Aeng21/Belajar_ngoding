const express = require('express');
const EnemyController = require('../controllers/enemyController');

const router = express.Router();

router.get('/', EnemyController.getAll);

router.get('/:id', EnemyController.getById);

router.post('/', EnemyController.create);

router.put('/:id', EnemyController.update);

router.delete('/:id', EnemyController.delete);

module.exports = router;