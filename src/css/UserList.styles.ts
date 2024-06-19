import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SearchContainer = styled.div`
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 400px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 30px;
`;

export const UserListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const UserCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const UserCard = styled.div`
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 350px;
`;

export const UserImage = styled.img`
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const LoadMoreContainer = styled.div`
  margin: 20px;
`;

export const LoadMoreButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;