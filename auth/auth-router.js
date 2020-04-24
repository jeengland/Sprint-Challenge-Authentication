const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticator = require('./authenticate-middleware.js');
const db = require('../database/dbConfig.js');

router.get('/users', authenticator, (req, res) => {
  db('users')
    .then((users) => {
      res.status(200).json({ users })
    })
})

router.post('/register', (req, res) => {
  const newUser = req.body;
  const hash = bcrypt.hashSync(newUser.password, 11);
  newUser.password = hash;
  db('users')
    .insert(newUser)
    .then((user) => {
      res.status(201).json({ user })
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: 'Unable to create new user.'
      })
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db('users')
    .where({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenGen(user);
        res.status(200).json({
          message: `Welcome, ${user.username}`,
          token,
        })
      } else {
        res.status(401).json({
          message: 'Invalid credentials.'
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: 'Unable to validate user.'
      })
    })
});

function tokenGen(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, process.env.AUTH_SECRET, options);
}

module.exports = router;
