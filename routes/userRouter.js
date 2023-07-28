const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();

router.get('/', UserController.index)
router.post('/', UserController.store)
router.get('/:id', UserController.show)
router.patch('/:id', UserController.update)
router.delete('/:id', UserController.destroy)



module.exports = router;