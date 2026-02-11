import mongoose from "mongoose";

const CompraSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, default: 1 },
  precio: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const Compra = mongoose.model("Compra", CompraSchema);

export default Compra;
