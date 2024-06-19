import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const BackIcon = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const UserDetailsCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  margin: 20px auto;
`;

export const UserDetailsImage = styled.img`
  border-radius: 50%;
  margin-bottom: 10px;
`;