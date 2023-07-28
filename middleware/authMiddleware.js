const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Tidak ada token, akses ditolak.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], 'shhhhh');
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token tidak valid, akses ditolak.', error: err });
    }
}