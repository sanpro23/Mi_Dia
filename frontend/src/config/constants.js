export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const STORAGE_KEYS = {
  NOTAS: 'notas',
  CALENDAR_EVENTS: 'calendarEvents',
  CATEGORIAS: 'categorias',
  PRODUCTOS: 'productos',
  TAREAS: 'tareas',
  CONTACTOS: 'contactos'
};

export const API_ENDPOINTS = {
  CONTACTOS: `${API_BASE_URL}/api/contactos`,
  USERS: `${API_BASE_URL}/api/users`,
  TAREAS: `${API_BASE_URL}/api/tareas`,
  NOTAS: `${API_BASE_URL}/api/notas`,
  EVENTOS: `${API_BASE_URL}/api/eventos`,
  COMPRAS: `${API_BASE_URL}/api/compras`
};

export const PAGINATION = {
  NOTAS_POR_PAGINA: 6,
  CATEGORIAS_POR_PAGINA: 3
};

export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/json', 'text/calendar']
};

export const DEBOUNCE_DELAY = 1000; // 1 segundo para auto-save