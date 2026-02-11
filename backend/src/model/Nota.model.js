import mongoose from "mongoose";

const notaSchema = new mongoose.Schema(
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
    contenido: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#fff8a6",
    },
    categoria: {
      type: String,
      default: "General",
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString(),
    },
  },
  { timestamps: true },
);

const Nota = mongoose.model("Nota", notaSchema);

export default Nota;
