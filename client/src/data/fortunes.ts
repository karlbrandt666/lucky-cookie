import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

export const getRandomFortune = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/api/fortune`);
    return response.data.fortune;
  } catch (error) {
    console.error('Error fetching fortune:', error);
    return 'Сегодня будет удачный день!';
  }
}; 