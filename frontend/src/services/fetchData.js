// api/users.js

const API_URL = "http://localhost:3000/api/users";

// Función genérica para peticiones
async function request(endpoint = "", options = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, options);

    // Si la respuesta no es OK, lanzamos error
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Error ${res.status}: ${errorText || "Error en la petición"}`
      );
    }

    // Intentamos parsear JSON (algunos DELETE no devuelven nada)
    try {
      return await res.json();
    } catch {
      return null;
    }

  } catch (error) {
    console.error("API Error:", error.message);
    throw error; // Importante: dejamos que el frontend decida qué hacer
  }
}

// GET - obtener todos los usuarios
export function getUsers() {
  return request("/");
}

// GET - obtener usuario por ID
export function getUserById(id) {
  return request(`/${id}`);
}

// POST - crear usuario
export function createUser(user) {
  return request("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

// PUT - actualizar usuario
export function updateUser(id, user) {
  return request(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
}

// DELETE - eliminar usuario
export function deleteUser(id) {
  return request(`/${id}`, {
    method: "DELETE",
  });
}



