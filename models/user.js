const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    telefone: {type: String},
    senha: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema); 