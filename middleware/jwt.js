const jwt = require("jsonwebtoken")

var jwtAuth = function (req, res, next) {
    try {
        var token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        return res.status(401).send(err);
    }
    next()
}

module.exports = jwtAuth;