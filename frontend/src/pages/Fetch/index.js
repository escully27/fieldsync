import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from '../../components/MapComponent';

const FetchPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);

  const API_URL = 'http://my-express-api-env.eba-abc123.us-east-1.elasticbeanstalk.com/api';

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setFetchSuccess(false);
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.get('https://emmettscully.com/api/users');
      setUsers(response.data);
      setFetchSuccess(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users from database. Please try again.');
      setLoading(false);
    }
  };

  return (

    <div style={{ padding: '24px' }}>

        <h1>Fetch Page</h1>
        <p>Retrieve the saved users from our database</p>
        
        <button 
          className="btn btn-primary mb-3" 
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Users'}
        </button>
        
        {error && <div className="alert alert-danger">{error}</div>}
        {fetchSuccess && <div className="alert alert-success">Users fetched successfully!</div>}


      {users.length > 0 && (
          <MapComponent locations={users} />
      )}

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
              {users.map((user, index) => (
                <tr key={index}>
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
        <div className="alert alert-warning">No users found. Click the Fetch button to retrieve users.</div>
      )}
    </div>
  );
};

export default FetchPage;