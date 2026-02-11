import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    completada: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Tarea = mongoose.model("Tarea", tareaSchema);

export default Tarea;
