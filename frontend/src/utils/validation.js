import { FILE_LIMITS } from '../config/constants';

export const sanitizeImportedData = (data, maxItems = 1000) => {
  if (!Array.isArray(data)) return [];
  
  return data
    .slice(0, maxItems)
    .map(item => ({
      ...item,
      id: item.id || Date.now() + Math.random()
    }))
    .filter(item => item !== null && typeof item === 'object');
};

export const validateFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No se ha seleccionado ningún archivo' };
  }

  if (file.size > FILE_LIMITS.MAX_SIZE) {
    return { 
      valid: false, 
      error: `El archivo excede el tamaño máximo permitido de ${FILE_LIMITS.MAX_SIZE / (1024 * 1024)}MB` 
    };
  }

  if (!FILE_LIMITS.ALLOWED_TYPES.includes(file.type)) {
    return { 
      valid: false, 
      error: `Tipo de archivo no permitido. Tipos permitidos: ${FILE_LIMITS.ALLOWED_TYPES.join(', ')}` 
    };
  }

  return { valid: true };
};

export const validateJsonData = (data, schema = {}) => {
  try {
    if (!Array.isArray(data)) {
      return { valid: false, error: 'El archivo debe contener un array de objetos' };
    }

    if (schema.required) {
      const missingFields = schema.required.filter(field => 
        data.some(item => !(field in item))
      );
      
      if (missingFields.length > 0) {
        return { 
          valid: false, 
          error: `Faltan campos requeridos: ${missingFields.join(', ')}` 
        };
      }
    }

    return { valid: true };
  } catch {
    return { valid: false, error: 'Error al validar la estructura del archivo' };
  }
};