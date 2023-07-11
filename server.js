const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./contollers/Register');
const signin = require('./contollers/Signin');
const profile = require('./contollers/Profile');
const image = require('./contollers/Image');

const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'awmm416@R',
    database: 'facerecognition'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  db.select('*')
    .from('users')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json('Error getting users'));
});

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)});

app.post('/register', (req,res)=>{register.handleRegister(req,res,db)});

app.get('/profile/:id',(req,res)=>{ profile.handleProfileGet(req,res,db)});

app.put('/image',(req,res)=>{image.handleImage(req,res,db)});

app.listen(3000, () => {
  console.log('Running on port 3000');
});
