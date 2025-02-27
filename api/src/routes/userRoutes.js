const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.saveUsers);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;