// API base URL - adjust based on your deployment
// For Railway deployments, we need to handle the API URL properly
const API_BASE_URL = import.meta.env.VITE_API_URL || 
                  (import.meta.env.PROD ? 'https://anas-backend.railway.internal/api' : 'http://localhost:5000/api');

console.log('API Base URL:', API_BASE_URL); // For debugging

// API client class
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Set auth token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  // Get auth token
  getToken() {
    return this.token || localStorage.getItem('authToken');
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
    }

    try {
      console.log(`Making API request to: ${url}`); // For debugging
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
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

  // POST request with form data (for file uploads)
  async postFormData(endpoint, formData) {
    const token = this.getToken();
    
    const config = {
      method: 'POST',
      body: formData,
      headers: {}
    };

    // Add auth token if available
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
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

export default api;