const express = require('express');
const Appointment = require('../models/appointment');
const router = express.Router();
const sendEmail = require('../services/emailService');

// Agendamento de atendimento
router.post('/schedule', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();
        res.status(201).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Listar todos os agendamentos
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('funcionario');
        res.status(200).send(appointments);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Cancelar agendamento
router.put('/cancel/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelado' },
            { new: true }
        );
        res.status(200).send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// envia e-mail
router.post('/schedule', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        await appointment.save();

        console.log('Agendamento salvo no banco de dados:', appointment); // Log 1

        // Enviar e-mail de confirmação
        const funcionario = await Employee.findById(appointment.funcionario);
        console.log('Funcionário encontrado:', funcionario); // Log 2

        const emailText = `Olá ${funcionario.nome}, seu agendamento para o dia ${appointment.dataAtendimento} foi confirmado.`;
        console.log('Preparando para enviar e-mail:', emailText); // Log 3

        sendEmail(funcionario.contato, 'Confirmação de Agendamento', emailText);

        res.status(201).send(appointment);
    } catch (error) {
        console.log('Erro ao agendar consulta:', error); // Log 4
        res.status(400).send(error);
    }
});

router.get('/calendar', async (req, res) => {
    try {
        const { start, end } = req.query;
        const appointments = await Appointment.find({
            dataAtendimento: { $gte: new Date(start), $lte: new Date(end) },
        }).populate('funcionario');
        res.status(200).send(appointments);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;