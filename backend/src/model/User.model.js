import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No puede haber dos usuarios con el mismo email
  },
  password: {
    type: String,
    required: true, // Se guardará encriptada
  },
}, { timestamps: true });  // Crea createdAt y updatedAt automáticamente

const User = mongoose.model('User', userSchema);

export default User;