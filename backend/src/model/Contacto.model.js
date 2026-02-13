import mongoose from "mongoose";

const contactoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foto: {
      type: String, //base64 o URL de la imagen
      required: false,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    telefono: {
      type: String,
      required: true,
    },
    ciudad: {
      type: String,
      required: false,
    },
    pais: {
      type: String,
      required: false,
    },
    empresa: {
      type: String,
      required: false,
    },
    puesto: {
      type: String,
      required: false,
    },
    notas: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Contacto = mongoose.model("Contacto", contactoSchema);

export default Contacto;
