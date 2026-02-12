import { API_ENDPOINTS } from '../config/constants';

class ApiService {
  constructor() {
    this.baseUrl = API_ENDPOINTS.CONTACTOS.split('/api')[0];
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async handleResponse(response) {
    if (response.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en la petición');
    }

    return response.json();
  }

  // Contactos
  async getContactos() {
    const response = await fetch(API_ENDPOINTS.CONTACTOS, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async createContacto(contacto) {
    const response = await fetch(API_ENDPOINTS.CONTACTOS, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(contacto),
    });
    return this.handleResponse(response);
  }

  async updateContacto(id, contacto) {
    const response = await fetch(`${API_ENDPOINTS.CONTACTOS}/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(contacto),
    });
    return this.handleResponse(response);
  }

  async deleteContacto(id) {
    const response = await fetch(`${API_ENDPOINTS.CONTACTOS}/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Tareas
  async getTareas() {
    const response = await fetch(`${this.baseUrl}/api/tareas`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async createTarea(tarea) {
    const response = await fetch(`${this.baseUrl}/api/tareas`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(tarea),
    });
    return this.handleResponse(response);
  }

  async updateTarea(id, tarea) {
    const response = await fetch(`${this.baseUrl}/api/tareas/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(tarea),
    });
    return this.handleResponse(response);
  }

  async deleteTarea(id) {
    const response = await fetch(`${this.baseUrl}/api/tareas/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Notas
  async getNotas() {
    const response = await fetch(`${this.baseUrl}/api/notas`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async createNota(nota) {
    const response = await fetch(`${this.baseUrl}/api/notas`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(nota),
    });
    return this.handleResponse(response);
  }

  async updateNota(id, nota) {
    const response = await fetch(`${this.baseUrl}/api/notas/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(nota),
    });
    return this.handleResponse(response);
  }

  async deleteNota(id) {
    const response = await fetch(`${this.baseUrl}/api/notas/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Eventos
  async getEventos() {
    const response = await fetch(`${this.baseUrl}/api/eventos`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async createEvento(evento) {
    const response = await fetch(`${this.baseUrl}/api/eventos`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(evento),
    });
    return this.handleResponse(response);
  }

  async updateEvento(id, evento) {
    const response = await fetch(`${this.baseUrl}/api/eventos/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(evento),
    });
    return this.handleResponse(response);
  }

  async deleteEvento(id) {
    const response = await fetch(`${this.baseUrl}/api/eventos/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Compras
  async getCompras() {
    const response = await fetch(`${this.baseUrl}/api/compras`, {
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  async createCompra(compra) {
    const response = await fetch(`${this.baseUrl}/api/compras`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(compra),
    });
    return this.handleResponse(response);
  }

  async updateCompra(id, compra) {
    const response = await fetch(`${this.baseUrl}/api/compras/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(compra),
    });
    return this.handleResponse(response);
  }

  async deleteCompra(id) {
    const response = await fetch(`${this.baseUrl}/api/compras/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    return this.handleResponse(response);
  }

  // Autenticación
  async login(email, password) {
    const response = await fetch(`${this.baseUrl}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return this.handleResponse(response);
  }

  async register(userData) {
    const response = await fetch(`${this.baseUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }
}

export default new ApiService();