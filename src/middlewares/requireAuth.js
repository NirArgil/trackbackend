const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    // const { authorization } = req.headers;
    const authorization = req.get("Authorization");
    if (!authorization) {
        return res.status(401).send({ error: 'No authorization'});
    }

    const token = authorization.replace('Bearer ', '');

    jwt.verify(token, 'SECRETKEY', async (err, payload) => {
        if(err) {
            return res.status(401).send({ error: 'You must be LOGGED IN3'});
        }

        const { userId } = payload;

        const user = await User.findById(userId);
        req.user = user;

        next();
    });
};