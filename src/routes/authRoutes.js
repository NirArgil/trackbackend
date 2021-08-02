const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization'); 

    res.send('cors problem fixed:)');
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, 'SECRETKEY' );
        res.send({ token });

        res.send('You have made post request');
    } catch (err) {
        res.status(422).send(err.message);
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must Provide EMAIL and PASSWORD' });
    }
    const user = await User.findOne({ email });

    if(!user) {
        return res.status(422).send({ error: 'invalid EMAIL or PASSWORD111' });
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, 'SECRETKEY' );
        res.send({ token });

    } catch (err) {
        return res.status(422).send({ error: 'invalid EMAIL or PASSWORD3' });
    }
});

module.exports = router;