const db = require("../db/sqldb")

const user_controller = new Object({
    getAllUsers: async (req, res) => {
        res.writeHead(200);
        const users = await db.getAllUsers();
        res.end(JSON.stringify(users));
    },

    createUser: (req, res) => {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", async () => {
            const userData = JSON.parse(body);
            user = await db.addUser(userData.name, userData.age);

            if(user) {
                res.writeHead(200);
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({message: "Failed to create new user, invalid data or internal error"}));
            }
        });
    },

    getUser: async (req, res) => {
        const id = parseInt(req.url.split("/")[2]);
        const user = await db.getUserById(id);

        if(user) {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: "User not found"}));
        }
    },

    deleteUser: async (req, res) => {
        const id = parseInt(req.url.split("/")[2]);
        const user = await db.deleteUserById(id);

        if(user) {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({message: "User not found"}));
        }
    },

    updateUser: (req, res) => {
        const id = parseInt(req.url.split("/")[2]);

        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", async () => {
            const userData = JSON.parse(body);
            const user = await db.updateUserInfo(id, userData.name, userData.age);

            if(user) {
                res.writeHead(200);
                res.end(JSON.stringify(user));
            } else {                
                res.writeHead(404);
                res.end(JSON.stringify({message: 'User not found or failed to update user info'}));
            }
        });
    },
})

module.exports = user_controller;