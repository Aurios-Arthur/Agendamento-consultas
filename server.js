const express = require("express"); // Framework para criar servidor
const cors = require("cors"); // Comunicador do front com o back-end
const bodyParser = require("body-parser"); // Processador de dados
const mongoose = require('mongoose'); // Conecta com o banco de dados
const User = require('./models/user'); // Modelo de usuário
const employeeRoutes = require('./routes/employeeRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');


// Configuração do servidor
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/employees', authMiddleware, employeeRoutes);
app.use('/api/appointments', authMiddleware, appointmentRoutes);
app.use(bodyParser.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Algo deu errado!' });
});
app.use((req, res, next) => {
    console.log('Corpo da requisição:', req.body);
    next();
});

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/agendamento-consultas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB!');
});

// Rota de teste
app.get('/', (req, res) => {
    res.send('Olá, mundo! O servidor está funcionando.');
});

// Rota de registro de usuários
app.post('/api/users/register', async (req, res) => {
    try {
        console.log('Dados recebidos:', req.body); // Para depuração
        const user = new User(req.body); // Corrigido: req.body
        await user.save(); // Corrigido: user.save()
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}); //possivel problema <--

app.use('/api/employees', employeeRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/auth', authRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log('Servidor funcionando na porta: ' + PORT);
});