const db = require('../db');

const userModel = {

  saveUsers: async (users) => {
    try {
      await db.query('BEGIN');

      for (const user of users) {

        console.log(" user -- >", user)

        const { name, company, email, phone, gps } = user;

        const checkEmailQuery = 'SELECT 1 FROM users WHERE email = $1';
        const emailExists = await db.query(checkEmailQuery, [email]);
        if (emailExists.rowCount > 0) {
          console.log('Email already exists:', email);
          continue; 
        }

        const query = `
        INSERT INTO users (name, company, email, phone, gps)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
      `;
        const result = await db.query(query, [name, company, email, phone, gps]);
        console.log('Inserted user ID:', result.rows[0].id);
      }

      await db.query('COMMIT');
      return true;
    } catch (err) {
      await db.query('ROLLBACK');
      console.error('Error saving users:', err);
      throw err;
    }
  },
  
  getUsers: async () => {
    const query = 'SELECT id, name, company, email, phone, gps FROM users';
    const result = await db.query(query);
    return result.rows;
  },

  deleteUser: async(i) => {

    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await db.query(query, [i]);
      return result.rowCount;
    } catch (err) {
      console.error('Error deleting user by ID:', err);
      throw err;
    }
    
  }

};

module.exports = userModel;