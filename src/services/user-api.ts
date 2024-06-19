import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';
export const fetchUsers = async (page: number | unknown = 1, query: string = "") => {
    const url = query
      ? `${API_URL}?page=${page}&results=10&seed=${query}`
      : `${API_URL}?page=${page}&results=10`;
    const response = await axios.get(url);
    return response.data.results;
  };

export const fetchUserDetails = async (id: string) => {
    const response = await axios.get(`${API_URL}?uuid=${id}`);
    return response.data.results[0];
  };