require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();


app.use('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization'); 

    res.send('cors problem fixed:)');
});


app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://adminNir:n12345@cluster0.bnsjt.mongodb.net/tracker?retryWrites=true&w=majority';

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
    res.send(`Server is GOOD`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
