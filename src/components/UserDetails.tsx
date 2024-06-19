import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import User from '../types/User';
import '../css/UserDetails.css';
import { fetchUserDetails } from '../services/user-api';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      if (id) {
        try {
          const userData = await fetchUserDetails(id);
          setUser(userData);
        } catch (err) {
          setError('Failed to fetch user details');
        } finally {
          setLoading(false);
        }
      } else {
        setError('User ID is not provided');
        setLoading(false);
      }
    };

    getUserDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className='userDetails'>
      <Link to="/" className='backIcon'> <ArrowLeft />Back to User List</Link>
      <div className="user-details-card">
      <img src={user.picture.large} alt={user.name.first} className="user-details-image" />
      <h2>{user.name.first} {user.name.last}</h2>
      <p>{user.email}</p>
      <p>{user.location.city}, {user.location.state}, {user.location.country}</p>
      <p>Phone: {user.phone}</p>
      <p>Cell: {user.cell}</p>
    </div>
    </div>
  );
};

export default UserDetails;
