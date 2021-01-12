const express = require('express');
const users = require('./users'); // might be redundant
const User = require('./users')

const server = express(); // instantiates our server with express.

server.use(express.json()) // this little thing is why my code couldn't
// take advantage of body-parser to read req.body

/*
    post, create user, done
    get, get all users, done
    get, get user by id, done
    delete, delete user by id
    put, edit user by id
*/

server.get('/', (req, res) => {
    res.json({message: 'User Page'});
});

server.get('/api/users', (req, res) => {
    User.getAll()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        })
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params

    User.findById(id)
        .then(user => {
            if (!user){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "The user information could not be retrieved." })
        })
});

server.post('/api/users', async (req, res) => {
    const user = req.body;
    console.log(req.body)
    if (!user.name || !user.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        try {
            const newUser = await User.create(user)
            res.status(201).json(newUser)
        } catch {
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }  
    }
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;  
    User.delete(id)
        .then(deleted => {
            if (!deleted){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(deleted)
            }
        })
});

server.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!changes.name || !changes.bio){
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        try {
            const updated = await User.update(id, changes);
            res.status(200).json(updated);
        } catch {
            res.status(500).json({ errorMessage: "The user information could not be modified." });
        }
    }
});

// server.post('/api/users', async (req, res) => {
//     // 1- pull info from request (and validate it)
//     const user = req.body;
//     if (!user.name || !user.bio){
//         res.status(400).json({ message: `name and weight are required` })
//     } else {
//         // 2- interact with the database
//         try {
//             const newlyCreated = await User.create(user);
//             // 3- send the client appropriate response
//             res.status(201).json(newlyCreated)
//         } catch (error) {
//             res.status(500).json({message: error.message})
//         }
//     }
// });

module.exports = server;