import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <h1>User Dashboard</h1>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
