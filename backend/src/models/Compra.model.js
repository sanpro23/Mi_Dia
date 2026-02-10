import mongoose from "mongoose";

const comprasSchema = new mongoose.Schema({

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    producto: {
        type: [String], //array de strings
        default: [],
    },
    
}, { timestamps: true });

const Compras = mongoose.model("Compra", compraSchema);

export default Compra;