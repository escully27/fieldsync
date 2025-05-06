import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const HomePage = () => {
  const { setUsers } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadedUsers, setDownloadedUsers] = useState([]);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      const userData = response.data.map(user => ({
        id: user.id,
        name: user.name,
        company: user.company.name,
        gps: user.address.geo.lat + "," + user.address.geo.lng,
        email: user.email,
        phone: user.phone
      }));
      
      setDownloadedUsers(userData);
      setUsers(userData);
      setLoading(false);
    } catch (err) {
      setError('Failed to download users. Please try again.');
      setLoading(false);
    }
  };

  return (

      <div style={{ padding: '24px' }}>
        <h1>Home Page</h1>
        <p>Get users from 'https://jsonplaceholder.typicode.com/users' initially</p>

        <button 
          className="btn btn-primary mb-3" 
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? 'Downloading...' : 'Get Users'}
        </button>
        
        {error && <div className="alert alert-danger">{error}</div>}

      {downloadedUsers.length > 0 && (
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
              {downloadedUsers.map(user => (
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
      )}
    </div>
  );
};

export default HomePage;