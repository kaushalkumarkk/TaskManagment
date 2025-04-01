import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Authentication
export const register = async (userData: { name: string; email: string; username: string; password: string }) => {
  return await axios.post(`${API_URL}/auth/register`, userData);
};

export const login = async (username: string, password: string) => {
  return await axios.post(`${API_URL}/auth/login`, { username, password });
};
export const getTasks = async (token: string) =>{
  return await axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } });
}
export const createTask = async (token: string, data: { title: string; description: string }) =>{
 return await axios.post(`${API_URL}/tasks`, data, { headers: { Authorization: `Bearer ${token}` } });
}
export const updateTask = async (
  token: string,
  id: string,
  data: { title?: string; description?: string; status?: "Pending" | "Completed" }
) => {
  return await axios.put(`${API_URL}/tasks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (token: string, id: string) =>{
 return await axios.delete(`${API_URL}/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}