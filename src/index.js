require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(trackRoutes);

const user = process.env.USERNAME;
const password = process.env.PASS;
const mongoUri = `mongodb+srv://${user}:${password}@cluster0.bnsjt.mongodb.net/tracker?retryWrites=true&w=majority`;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.error('Error connect to mongo', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('listening on port 3000');
});
