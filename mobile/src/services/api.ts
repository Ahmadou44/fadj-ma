import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
}

class ApiService {
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('token');
  }

  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const token = await this.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      method: options.method || 'GET',
      headers,
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          // Token expiré, déconnecter l'utilisateur
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('user');
          throw new Error('Unauthorized');
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Error [${options.method || 'GET'} ${endpoint}]:`, error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  }

  async register(data: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: data,
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // User endpoints
  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(data: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: data,
    });
  }

  // Orders endpoints
  async getOrders(filters?: any) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/orders${params ? `?${params}` : ''}`);
  }

  async getOrderById(orderId: string) {
    return this.request(`/orders/${orderId}`);
  }

  async createOrder(data: any) {
    return this.request('/orders', {
      method: 'POST',
      body: data,
    });
  }

  async updateOrder(orderId: string, data: any) {
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: data,
    });
  }

  async cancelOrder(orderId: string) {
    return this.request(`/orders/${orderId}/cancel`, {
      method: 'POST',
    });
  }

  // Pharmacies endpoints
  async getPharmacies(filters?: any) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/pharmacies${params ? `?${params}` : ''}`);
  }

  async getPharmacyById(pharmacyId: string) {
    return this.request(`/pharmacies/${pharmacyId}`);
  }

  // Medicines endpoints
  async getMedicines(filters?: any) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/medicines${params ? `?${params}` : ''}`);
  }

  async getMedicineById(medicineId: string) {
    return this.request(`/medicines/${medicineId}`);
  }

  // Prescriptions endpoints
  async getPrescriptions() {
    return this.request('/prescriptions');
  }

  async uploadPrescription(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    const token = await this.getToken();
    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/prescriptions/upload`, {
        method: 'POST',
        headers,
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  // Payment endpoints
  async initiatePayment(data: any) {
    return this.request('/payments/initiate', {
      method: 'POST',
      body: data,
    });
  }

  async confirmPayment(paymentId: string) {
    return this.request(`/payments/${paymentId}/confirm`, {
      method: 'POST',
    });
  }

  // Professional endpoints
  async getProfessionalProfile() {
    return this.request('/professionals/profile');
  }

  async updateProfessionalProfile(data: any) {
    return this.request('/professionals/profile', {
      method: 'PUT',
      body: data,
    });
  }

  async getProfessionalOrders(filters?: any) {
    const params = new URLSearchParams(filters).toString();
    return this.request(`/professionals/orders${params ? `?${params}` : ''}`);
  }

  async updateProfessionalOrder(orderId: string, data: any) {
    return this.request(`/professionals/orders/${orderId}`, {
      method: 'PUT',
      body: data,
    });
  }

  // Analytics endpoints
  async getAnalytics(period?: string) {
    return this.request(`/professionals/analytics${period ? `?period=${period}` : ''}`);
  }

  // Subscription endpoints
  async getSubscription() {
    return this.request('/subscriptions/current');
  }

  async getSubscriptionPlans() {
    return this.request('/subscriptions/plans');
  }

  async upgradeSubscription(planId: string) {
    return this.request('/subscriptions/upgrade', {
      method: 'POST',
      body: { planId },
    });
  }
}

export const apiService = new ApiService();
