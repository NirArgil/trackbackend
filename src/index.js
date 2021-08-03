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
 
const corsOptions = {
    origin: '*',
    credentials: true,
    allowedHeaders:['content-type', 'authorization']
};
    
app.use(cors(corsOptions));

req.header('authorization');

app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    res.setHeader('Access-Control-Allow-Headers', 'content-type,accept, x-access-token, authorization');
  
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    next();
  });

app.get('/', requireAuth, (req, res) => {
    res.send(`Server is GOOD`);
});

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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
