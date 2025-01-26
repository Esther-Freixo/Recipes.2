const BASE_URL = `http://localhost:${import.meta.env.VITE_API_PORT || '3001'}`;

export const requestData = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};