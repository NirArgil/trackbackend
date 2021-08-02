const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
      const { authorization } = req.headers;

    console.log(authorization);

    if (!authorization) {
        return res.status(401).send({ error: 'You must be LOGGED IN1'});
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