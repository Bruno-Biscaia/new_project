const jwt = require('jsonwebtoken');
require('dotenv').config(); // Isso vai carregar as variáveis de ambiente do seu arquivo .env

function auth(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: 'Nenhum token, autorização negada' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token não é válido' });
    }
}

module.exports = auth;
