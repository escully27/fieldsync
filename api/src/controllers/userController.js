const userModel = require('../models/userModel');
const db = require('../db');

const userController = {
  
  // Save users to the database
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
  
  // Get all users from the database
  getUsers: async (req, res) => {
    try {
      const users = await userModel.getUsers();

      // for (var u in users) {
      //   userModel.deleteUser(users[u].id)
      // }

      return res.status(200).json(users);
    } catch (err) {
      console.error('Error in getUsers controller:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  deleteUser: async (req, res) => {

    try {
      const { id } = req.params;
      console.log(" id ", id)
      const users = await userModel.deleteUser(id);
      return res.status(200).json({ success: 'deleted ' + users + ' users' });
    } catch (err) {
      console.error('Error in getUsers controller:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }

  }


};

module.exports = userController;