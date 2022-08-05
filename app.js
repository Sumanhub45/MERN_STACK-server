const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
require('./db/conn');
const PORT = process.env.PORT;

const middleware = (req, res, next) => {
    console.log("Hello from middleware");
    next();
}

app.get('/', (req, res) => {
    res.send('Hello world home');
})

app.get('/about', middleware, (req, res) => {
    console.log('about about')
    res.send('Hello world about');
})

app.get('/contact', (req, res) => {
    res.send('Hello world contact');
})

app.get('/signin', (req, res) => {
    res.send('Hello world signin');
})

app.get('/signup', (req, res) => {
    res.send('Hello world signup');
})


app.listen(PORT, () => {
    console.log(`server is running at port no. ${PORT}`);
});