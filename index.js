// implement your API here
const express = require('express');

const userModel = require('./data/db.js'); // <<<<< require data access

const server = express();

// middleware
// teach express how to read JSON fro the request body
server.use(express.json()); // <<<<<<<<<<<<<<<<<<<<<<<<<< we need this for POST and PUT

server.get('/', (req, res) => {
  // order matters, the first argument is the request
  res.send('was up my dude?');
});

server.get('/api/users', (req, res) => {
  // get a list of users from the database
  userModel
    .find()
    .then(users => {
      // send the list of users back to the client
      res.send(users);
    })
    .catch(error => {
      res.send(error);
    });
});

// add a hub
server.post('/api/users', (req, res) => {
  // axios.post(url, data);
  // get the user data from the request
  const userData = req.body;

  // validate the data sent by he client
  // NEVER TRUST THE CLIENT!!!!!
  if (!userData.name || !userData.bio) {
    res.status(400).json({ errorMessage: 'who goes there!!?, Please provide name and bio for the user.' });
  } else {
    // add the user to the database
    userModel
      .add(userData)
      .then(user => {
        // send the user back to the client
        res.json(user); //.json() will set the right headers and convert to JSON
      })
      .catch(error => {
        res.json({ message: 'ERROR cannot save user!' });
      });
  }
});

server.delete('/api/users/:id', (req, res) => {
  // axios.delete('/users/2')
  const id = req.params.id; // params is an object with all the url parameters

  userModel
    .remove(id)
    .then(user => {
      // send the user back to the client
      res.json(user); //.json() will set the right headers and convert to JSON
    })
    .catch(error => {
      res.json({ message: 'error deleting the user!!!' });
    });
});

server.put('/users/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  userModel
    .update(id, changes)
    .then(hub => {
      // send the user back to the client
      res.json(user); //.json() will set the right headers and convert to JSON
    })
    .catch(error => {
      res.json({ message: 'error updating the user' });
    });
});

const port = 8000;
server.listen(port, () => console.log('\nserver running\n'));

// npm i express
// npm run server
// visit localhost:8000

// typos are the bane of developers
