require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');


const secret =
  process.env.JWT_SECRET || 'add a third table for many to many relationships';

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("It's alive!");
});

server.post('/api/register', (req, res) => {
  let user = req.body;

 
  const hash = bcrypt.hashSync(user.password, 10);

  
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


function generateToken(user) {
  const payload = {
    subject: user.id, 
    username: user.username,
    roles: ['Student'],
    
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
}

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token,
          secret,
          roles: token.roles,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        
        res.status(401).json({ you: "can't touch this!" });
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
}

function checkRole(role) {
  return function(req, res, next) {
    if (req.decodedJwt.roles && req.decodedJwt.roles.includes(role)) {
      next();
    } else {
      res.status(403).json({ you: 'you have no power here!' });
    }
  };
}

server.get('/api/users', restricted, checkRole('Student'), (req, res) => {
  Users.find()
    .then(users => {
      res.json({ users, decodedToken: req.decodedJwt });
    })
    .catch(err => res.send(err));
});

server.get('/users', restricted, async (req, res) => {
  try {
    const users = await Users.find();

    res.json(users);
  } catch (error) {
    res.send(error);
  }
});

const port = process.env.PORT || 5555;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));