const jwt = require('jsonwebtoken');
const { status_codes, status_message } = require('../utils/codeAndmessage');

function Verifytoken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(status_codes.UNAUTHORIZED).json({
        success: false,
        status: status_codes.UNAUTHORIZED,
        message: status_message.MISSING_TOKEN
    });

    try {
        const verifyToken = jwt.verify(token.split('Bearer ')[1], 'abcdef123');
        // console.log("verifyToken",verifyToken);
        req.userId = verifyToken.data

    } catch (error) {
        return res.status(status_codes.UNAUTHORIZED).json({ success: false, status: status_codes.UNAUTHORIZED, message: status_message.INVALID_TOKEN });
    }
    next();
}

module.exports = Verifytoken;