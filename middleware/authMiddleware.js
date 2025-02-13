const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send({ message: 'Acesso negado. Nenhum token fornecido.' });
    }
    try {
        const decoded = jwt.verify(token, 'secreto');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Token inválido.' });
    }
};

module.exports = authMiddleware;