import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import SavePage from './pages/Save';
import FetchPage from './pages/Fetch';
import CesiumPage from './pages/Cesium';
import { Ion } from 'cesium';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzODY2NDE0Yy0yMzhhLTRlZDUtOTI0Ny03YjYwNmViNDE2NjEiLCJpZCI6Mjc4NzkxLCJpYXQiOjE3NDA0MjkyOTN9.s5v-6SngxJDxyDLYcAYdI91NU5vEX7AWsXZQ_ZcZKqc';

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/save" element={<SavePage />} />
            <Route path="/fetch" element={<FetchPage />} />
            <Route path="/cesium" element={<CesiumPage />} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}

export default App;