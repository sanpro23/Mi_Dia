
# Backend Mi Día

API REST para la aplicación "Mi Día" construida con Node.js, Express y MongoDB.

## 🚀 Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
   - Copia el archivo `.env.example` y renómbralo a `.env`
   - Actualiza las credenciales de MongoDB y JWT_SECRET

```env
MONGO_URI=mongodb+srv://TU_USUARIO:TU_PASSWORD@cluster.mongodb.net/mi_dia
PORT=5000
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
```

3. **Ejecutar el servidor:**

**Desarrollo (con recarga automática):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # Configuración de MongoDB
│   ├── middleware/
│   │   └── auth.middleware.js    # Middleware de autenticación JWT
│   ├── models/
│   │   ├── User.model.js         # Modelo de Usuario
│   │   ├── Tarea.model.js        # Modelo de Tareas
│   │   ├── Nota.model.js         # Modelo de Notas
│   │   ├── Evento.model.js       # Modelo de Eventos
│   │   ├── Contacto.model.js     # Modelo de Contactos
│   │   └── Compra.model.js       # Modelo de Compras
│   ├── routes/
│   │   ├── auth.routes.js        # Rutas de autenticación
│   │   ├── tareas.routes.js      # Rutas de tareas
│   │   ├── notas.routes.js       # Rutas de notas
│   │   ├── eventos.routes.js     # Rutas de eventos
│   │   ├── contactos.routes.js   # Rutas de contactos
│   │   └── compras.routes.js     # Rutas de compras
│   └── server.js                 # Punto de entrada
├── .env                          # Variables de entorno
├── .env.example                  # Ejemplo de variables
└── package.json                  # Dependencias
```

## 🔐 Endpoints de Autenticación

### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "contraseña123"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@ejemplo.com",
  "password": "contraseña123"
}
```

### Obtener Perfil
```http
GET /api/auth/profile
Authorization: Bearer {token}
```

## 📋 Endpoints Protegidos

**Todos los siguientes endpoints requieren el header:**
```
Authorization: Bearer {token}
```

### Tareas
- `GET /api/tareas` - Obtener todas las tareas
- `POST /api/tareas` - Crear nueva tarea
- `PUT /api/tareas/:id` - Editar tarea
- `DELETE /api/tareas/:id` - Eliminar tarea

### Notas
- `GET /api/notas` - Obtener todas las notas
- `POST /api/notas` - Crear nueva nota
- `PUT /api/notas/:id` - Editar nota
- `DELETE /api/notas/:id` - Eliminar nota

### Eventos
- `GET /api/eventos` - Obtener todos los eventos
- `GET /api/eventos/fecha/:fecha` - Obtener eventos por fecha
- `POST /api/eventos` - Crear nuevo evento
- `PUT /api/eventos/:id` - Editar evento
- `DELETE /api/eventos/:id` - Eliminar evento

### Contactos
- `GET /api/contactos` - Obtener todos los contactos
- `POST /api/contactos` - Crear nuevo contacto
- `PUT /api/contactos/:id` - Editar contacto
- `DELETE /api/contactos/:id` - Eliminar contacto

### Compras
- `GET /api/compras` - Obtener todas las categorías
- `POST /api/compras` - Crear nueva categoría
- `PUT /api/compras/:id` - Renombrar categoría
- `DELETE /api/compras/:id` - Eliminar categoría
- `POST /api/compras/:id/productos` - Añadir producto
- `DELETE /api/compras/:id/productos` - Eliminar producto

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación con tokens
- **Bcrypt** - Encriptación de contraseñas
- **Cors** - Manejo de CORS
- **Dotenv** - Variables de entorno

## 📦 Dependencias

```json
{
  "bcrypt": "^6.0.0",
  "cors": "^2.8.6",
  "dotenv": "^17.2.4",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.2.0"
}
```

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verifica que tu IP esté en la whitelist de MongoDB Atlas
- Comprueba que las credenciales en `.env` sean correctas
- Asegúrate de tener conexión a internet

### Error "JWT_SECRET is not defined"
- Verifica que el archivo `.env` exista
- Asegúrate de que tenga la variable `JWT_SECRET` definida

### Error de CORS
- Verifica que el frontend esté configurado correctamente
- El servidor permite todas las origins por defecto

## 📝 Notas

- Las contraseñas se encriptan con bcrypt antes de guardarse
- Los tokens JWT expiran en 30 días
- Todas las rutas excepto `/api/auth/*` requieren autenticación
- Las imágenes de contactos se guardan en formato base64

## 👨‍💻 Autor Antonio Santos

Desarrollado como proyecto Full Stack con JavaScript