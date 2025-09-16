// API base URL - adjust based on your deployment
// For Railway deployments, we need to handle the API URL properly
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                  (import.meta.env.PROD ? 'https://anas-backend-production.up.railway.app/api' : 'http://localhost:5000/api');

console.log('API Base URL:', API_BASE_URL); // For debugging

// API client class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    // Don't store token in instance property, always get from localStorage
  }

  // Set auth token
  setToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get auth token - always get from localStorage
  getToken() {
    const token = localStorage.getItem('authToken');
    console.log('Getting token from localStorage:', token);
    return token;
  }

  // Make API request
  async request(endpoint, options = {}) {
    // Construct the full URL
    // For Railway deployments, we need to ensure we're using the correct path structure
    let url;
    if (endpoint.startsWith('/')) {
      // If endpoint starts with /, append directly to baseURL
      url = `${this.baseURL}${endpoint}`;
    } else {
      // If endpoint doesn't start with /, add it
      url = `${this.baseURL}/${endpoint}`;
    }
    
    const token = this.getToken();
    console.log('Token for request:', token);
    console.log('Making request to:', url);
    console.log('Request options:', options);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers['Authorization']);
    } else {
      console.log('No token available, not setting Authorization header');
    }

    try {
      console.log(`Making API request to: ${url}`); // For debugging
      const response = await fetch(url, config);
      console.log('API response status:', response.status);
      console.log('API response headers:', [...response.headers.entries()]);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error response:', errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // POST request with form data (for file uploads)
  async postFormData(endpoint, formData) {
    const token = this.getToken();
    console.log('Token for form data request:', token);
    
    const config = {
      method: 'POST',
      body: formData,
      headers: {}
    };

    // Add auth token if available
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('Authorization header set for form data:', config.headers['Authorization']);
    } else {
      console.log('No token available for form data request, not setting Authorization header');
    }

    // Construct the full URL
    let url;
    if (endpoint.startsWith('/')) {
      url = `${this.baseURL}${endpoint}`;
    } else {
      url = `${this.baseURL}/${endpoint}`;
    }
    
    try {
      console.log(`Making API request to: ${url}`); // For debugging
      console.log('Form data request config:', config);
      const response = await fetch(url, config);
      console.log('Form data API response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Form data API error response:', errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Form data API response:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create and export API client instance
export const apiClient = new ApiClient();

// Export individual API methods
export const api = {
  // Auth methods
  auth: {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    verify: () => apiClient.get('/auth/verify'),
    logout: () => {
      apiClient.setToken(null);
      return Promise.resolve();
    }
  },

  // Projects methods
  projects: {
    getAll: () => apiClient.get('/projects'),
    getById: (id) => apiClient.get(`/projects/${id}`),
    create: (data) => apiClient.post('/projects', data),
    update: (id, data) => apiClient.put(`/projects/${id}`, data),
    delete: (id) => apiClient.delete(`/projects/${id}`)
  },

  // Technologies methods
  technologies: {
    getAll: () => apiClient.get('/technologies'),
    getById: (id) => apiClient.get(`/technologies/${id}`),
    create: (data) => apiClient.post('/technologies', data),
    update: (id, data) => apiClient.put(`/technologies/${id}`, data),
    delete: (id) => apiClient.delete(`/technologies/${id}`)
  },

  // About methods
  about: {
    get: () => apiClient.get('/about'),
    update: (data) => apiClient.put('/about', data),
    create: (data) => apiClient.post('/about', data)
  },

  // Homepage methods
  homepage: {
    get: () => apiClient.get('/homepage'),
    update: (data) => apiClient.put('/homepage', data),
    uploadCV: (formData) => apiClient.postFormData('/homepage/upload-cv', formData)
  },

  // Health check
  health: () => apiClient.get('/health')
};

// Add contact methods to the API
api.contact = {
  info: {
    get: () => apiClient.get('/contact/info'),
    update: (data) => apiClient.put('/contact/info', data)
  },
  submissions: {
    getAll: () => apiClient.get('/contact/submissions'),
    getById: (id) => apiClient.get(`/contact/submissions/${id}`),
    delete: (id) => apiClient.delete(`/contact/submissions/${id}`)
  },
  submit: {
    create: (data) => apiClient.post('/contact/submit', data)
  }
};

// Export both api and apiClient
export default api;