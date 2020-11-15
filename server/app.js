const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
const {MONGOURI} = require('./keys');
const cookieParser = require('cookie-parser')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const tweetRoutes = require('./routes/tweet');

//MIDDLEWARE
app.use(bodyParser.json());
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors())

//ROUTES MIDDLEWARE
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', tweetRoutes);

mongoose.connect(MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection.on('connected', ()=>{
    console.log('connected to mongo');
})
mongoose.connection.on('error', ()=>{
    console.log('MongoDB connection err');
})

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})