const express = require('express');
const PlayerController = require('../controllers/playerController');

const router = express.Router();

router.get('/', PlayerController.getAll);

router.get('/:id', PlayerController.getById);

router.post('/', PlayerController.create);

router.put('/:id', PlayerController.update);

router.delete('/:id', PlayerController.delete);

module.exports = router;