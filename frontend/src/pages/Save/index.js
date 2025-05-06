import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const SavePage = () => {
  const { users } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    if (users.length === 0) {
      setError('No users to save. Please download users from the Home page first.');
      return;
    }

    setLoading(true);
    setError(null);
    setSaveSuccess(false);
    
    try {
      // Replace with your actual API endpoint
      await axios.post('https://emmettscully.com/api/users/', { users });
      setSaveSuccess(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to save users. Please try again.');
      setLoading(false);
    }
  };

  return (

      <div style={{ padding: '24px' }}>

        <h1>Save Page</h1>
        <p>Save the retrieved users to our database</p>
        
        <button 
          className="btn btn-primary mb-3" 
          onClick={handleSave}
          disabled={loading || users.length === 0}
        >
          {loading ? 'Saving...' : 'Save Users'}
        </button>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {saveSuccess && <div className="alert alert-success">Users saved successfully!</div>}

      
      {users.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Company</th>
                <th>GPS</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.company}</td>
                  <td>{user.gps}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning">No users available. Please download users from the Home page.</div>
      )}
    </div>
  );
};

export default SavePage;