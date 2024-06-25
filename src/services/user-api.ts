import axios from 'axios';
import User from '../types/User';

const API_URL = 'https://randomuser.me/api/';
export const fetchUsers = async (page: number | unknown = 1, query: string = "") => {
  const url = query
    ? `${API_URL}?page=${page}&results=10&seed=${query}`
    : `${API_URL}?page=${page}&results=10`;
  const response = await axios.get(url);
  const data = response.data;

  return {
      results: data.results,
      info: {
          next: data.info.page + 1, // since Randome user api is not giving next page info adding it manually
      }
  };
};
export const fetchUserDetails = async (id: string): Promise<User> => {
  const response = await axios.get(`${API_URL}?uuid=${id}`);
  if (response.data.results.length === 0) {
    throw new Error('User not found');
  }
  return response.data.results[0];
};