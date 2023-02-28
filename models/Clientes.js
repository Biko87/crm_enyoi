const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const clientesSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: true
  },
  apellido: {
    type: String,
    trim: true,
    required: true
  },
  empresa: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  telefono: {
    type: String,
    trim: true,
    required: true
  }
})
 
module.exports = mongoose.model('Clientes', clientesSchema)