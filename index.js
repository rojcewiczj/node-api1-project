// implement your API here
const express = require('express');
const cors = require('cors');
const userModel = require('./data/db.js'); // <<<<< require data access

const server = express();

// middleware
server.use(cors());
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
        res.status(500).json({ error: 'The users information could not be retrieved.' });
    });
});

server.get('/api/users/:id', (req, res) => {
    // get a user base on the id from the database
    const id = req.params.id;
      
    userModel
      .findById(id)
      .then(user => {
        // send the user back to the client 
        if(!user) {
      res.status(404).json({ message: 'The user with the specified ID does not exist.' });
    } 
        res.send(user);
      })
      .catch(error => {
          res.status(500).json({ error: 'The user information could not be retrieved.' });
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
      .insert(userData)
      
      .then(user => {
        // send the user back to the client
        res.status(201);
        res.json(user); //.json() will set the right headers and convert to JSON
      })
      .catch(error => {
        res.status(500).json({ error: 'There was an error while saving the user to the database' });
      });
  }
});

server.delete('/api/users/:id', (req, res) => {
  // axios.delete('/users/2')
  
  const id = req.params.id; // params is an object with all the url parameters
 
  

  userModel
    .remove(id)
    .then(user => {
       if(!user) {
    res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  }
      // send the user back to the client
      res.json(user); //.json() will set the right headers and convert to JSON
    })
    .catch(error => {
      res.status(500).json({ error: 'the user could not be removed' });
    });
  
});

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
 
  if  (!changes.name || !changes.bio) {
    res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' });
  }
  else {
  
  userModel
    .update(id, changes)
    .then(user => {
      // send the user back to the client
     if(!user) {
    res.status(404).json({ message: 'The user with the specified ID does not exist.' });
  }

      res.status(201);
      res.json(user); //.json() will set the right headers and convert to JSON
    })
    .catch(error => {
      res.json({ error: "The user information could not be modified." });
    });
  }
});

const port = 8000;
server.listen(port, () => console.log('\nserver running\n'));

// npm i express
// npm run server
// visit localhost:8000

// typos are the bane of developers
