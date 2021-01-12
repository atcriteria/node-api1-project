const shortid = require('shortid');

let users = [
    {id: shortid.generate(), name: "Kevin James", bio: "funny guy"},
    {id: shortid.generate(), name: "Nicholas Cage", bio: "steals papers"},
    {id: shortid.generate(), name: "Russle Crowe", bio: "talks to birds"},
    {id: shortid.generate(), name: "Vin Diesel", bio: "likes family"},
    {id: shortid.generate(), name: "Elon Musk", bio: "is an alien"}
];

// helpers i need:
/*
    -Return all users
    -Return user with id
    -Create user
    -Update user based on id
    -Remove user by id
*/

module.exports = {

    // returns all users
    getAll() {
        return Promise.resolve(users);
    },

    // returns user by ID
    findById(id){
        const user = users.find(user => user.id === id);
        return Promise.resolve(user);
    },

    // creates user
    create({name, bio}){
        const newUser = { id: shortid.generate(), name, bio }
        users.push(newUser);
        return Promise.resolve(newUser);
    },

    // updates user
    update(id, changes) {
        const user = users.find(user => user.id === id);
        if (!user) return Promise.resolve(null);

        const updateUser = { ...changes, id}
        users = users.map(user => (user.id === id) ? updateUser : user);
        return Promise.resolve(updateUser);
    },

    // delete user by id
    delete(id) {
        const user = users.find(user => user.id === id);
        if (!user) return Promise.resolve(null);

        users = users.filter(user => user.id !== id);
        return Promise.resolve(user)
    }

}