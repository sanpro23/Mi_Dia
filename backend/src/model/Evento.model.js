import mongoose from "mongoose";
import User from "./User.model.js";

const eventoSchema = new mongoose.Schema(
  {
    Usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    //fecha como usa en el fronted 
    fecha: {
      type: String,
      required: true,
    },
    //texo del evento, por ejemplo "Reunión con el equipo"
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#ff0000", //rojo por defecto
    },
  },
  { timestamps: true },
);

const Evento = mongoose.model("Evento", eventoSchema);

export default Evento;
