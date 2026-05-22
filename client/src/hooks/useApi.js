import axios from 'axios';
from '@context/AuthContext';

const useApi = () => {
  const { API_URL, token } = useAuth();

  const apiCall = async (method, endpoint, data = null) => {
    try {
      const config = {
        method,
        url: `${API_URL}${endpoint}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'API call failed',
        error,
      };
    }
  };

  return {
    get: (endpoint) => apiCall('GET', endpoint),
    post: (endpoint, data) => apiCall('POST', endpoint, data),
    put: (endpoint, data) => apiCall('PUT', endpoint, data),
    delete: (endpoint) => apiCall('DELETE', endpoint),
  };
};

export default useApi;
