import api from './http';
import { handleApiResponse, handleApiError } from '../utils/responseHandler';

// register
export async function register(data) {
  try {
    const response = await api.post('/api/register', data);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}

// login
export async function login(data) {
  try {
    const response = await api.post('/api/login', data);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
}
