const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    funcionario: {type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true},
    dataAtendimento: {type: Date, required: true},
    status: {type: String, enum: ['agendado', 'Cancelado'], default: 'agendado'},
});

module.exports = mongoose.model('Appointment', appointmentSchema);