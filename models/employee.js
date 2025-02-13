const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    nome: { type: String, required: [true, 'O nome é obrigatório'] },
    dataNascimento: { type: Date, required: [true, 'A data de nascimento é obrigatória'] },
    dataAdmissao: { type: Date, required: [true, 'A data de admissão é obrigatória'] },
    cpf: { type: String, required: [true, 'O CPF é obrigatório'], unique: true },
    setor: { type: String, required: [true, 'O setor é obrigatório'] },
    cargo: { type: String, required: [true, 'O cargo é obrigatório'] },
    sexo: { type: String, enum: ['Masculino', 'Feminino', 'Outro'], required: [true, 'O sexo é obrigatório'] },
    matriculaESocial: { type: String, required: [true, 'A matrícula e-Social é obrigatória'], unique: true },
    contato: { type: String, required: [true, 'O contato é obrigatório'] },
});

module.exports = mongoose.model('Employee', employeeSchema);