const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

// Registro de usuário
router.post('/register', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const hashedSenha = await bcrypt.hash(senha, 10);
        const user = new User({ nome, email, senha: hashedSenha });
        await user.save();
        res.status(201).send({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login de usuário
router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ message: 'Usuário não encontrado.' });
        }
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            return res.status(400).send({ message: 'Senha incorreta.' });
        }
        const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router; // Exporte o router