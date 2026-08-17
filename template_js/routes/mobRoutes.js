const express = require('express');
const MobController = require('../controllers/mobController');

const router = express.Router();

router.get('/', MobController.getAll);

router.get('/:id', MobController.getById);

router.post('/', MobController.create);

router.put('/:id', MobController.update);

router.delete('/:id', MobController.delete);

module.exports = router;