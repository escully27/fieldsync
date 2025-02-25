const userModel = require('../models/userModel');
const db = require('../db');

const userController = {
  
  saveUsers: async (req, res) => {
    try {
      const { users } = req.body;
      const usersOut = await userModel.saveUsers(users);
      return res.status(200).json(usersOut);
    } catch (err) {
      console.error('Error in getUsers controller:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  },
  
  getUsers: async (req, res) => {
    try {
      const users = await userModel.getUsers();

      return res.status(200).json(users);
    } catch (err) {
      console.error('Error in getUsers controller:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  deleteUser: async (req, res) => {

    try {
      const { id } = req.params;
      const users = await userModel.deleteUser(id);
      return res.status(200).json({ success: 'deleted ' + users + ' users' });
    } catch (err) {
      console.error('Error in getUsers controller:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

  }


};

module.exports = userController;