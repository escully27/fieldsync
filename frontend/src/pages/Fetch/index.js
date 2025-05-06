import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from '../../components/MapComponent';
import AddUserModal from '../../components/AddUser';

const FetchPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deletingIds, setDeletingIds] = useState([]);

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


  const handleDelete = async (userId) => {
    try {
      setDeletingIds(prev => [...prev, userId]);
      await axios.delete(`https://emmettscully.com/api/users/${userId}`);

      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

      setFetchSuccess('User deleted successfully!');
      setTimeout(() => setFetchSuccess(false), 3000);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setDeletingIds(prev => prev.filter(id => id !== userId));
    }
  };

  return (

    <div style={{ padding: '24px' }}>

        <h1>Fetch Page</h1>
        <p>Retrieve the saved users from our database</p>
        
      <div className="d-flex gap-2 mb-3">
        <button
          className="btn btn-primary"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch Users'}
        </button>

        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
        >
          Add New User
        </button>
      </div>
        
      {error && <div className="alert alert-danger">{error}</div>}
      {fetchSuccess && <div className="alert alert-success">
        {typeof fetchSuccess === 'string' ? fetchSuccess : 'Users fetched successfully!'}
      </div>}

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
                <th></th>
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
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.id)}
                      disabled={deletingIds.includes(user.id)}
                    >
                      {deletingIds.includes(user.id) ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning">No users found. Click the Fetch button to retrieve users.</div>
      )}


      <AddUserModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onUserAdded={() => {
          handleFetch();
        }}
      />

    </div>
  );
};

export default FetchPage;