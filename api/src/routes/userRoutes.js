const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/users', userController.saveUsers);
router.get('/users', userController.getUsers);
router.delete('/users/:id', userController.deleteUser);

router.get('/google-maps-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

module.exports = router;