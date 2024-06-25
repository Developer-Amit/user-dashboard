import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import User from '../types/User';
import { fetchUserDetails } from '../services/user-api';
import Loader from './Loader';
import {
  UserDetailsContainer,
  UserDetailsCard,
  BackIcon,
  UserDetailsImage,
} from '../css/UserDetails.styles';

const UserDetails: React.FC = () => {
  const { id = ''} = useParams<{ id: string }>();

  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userDetails', id],
    queryFn: () => fetchUserDetails(id),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  if (isLoading) return <Loader />;
  if (isError) return <div>{error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <UserDetailsContainer>
      <BackIcon to="/">
        <ArrowLeft /> Back to User List
      </BackIcon>
      <UserDetailsCard>
        <UserDetailsImage src={user.picture.large} alt={user.name.first} />
        <h2>{user.name.first} {user.name.last}</h2>
        <p>{user.email}</p>
        <p>{user.location.city}, {user.location.state}, {user.location.country}</p>
        <p>Phone: {user.phone}</p>
        <p>Cell: {user.cell}</p>
      </UserDetailsCard>
    </UserDetailsContainer>
  );
};

export default UserDetails;
