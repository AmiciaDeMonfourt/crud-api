let id = 3;

class DB {
    constructor() {
        this.users = {
            "0": {
                "name": "Andry",
                "age": "15"
            },
            "1": {
                "name": "Bob",
                "age": "20"
            },
            "2": {
                "name": "Tia",
                "age": "536"
            }     
        }
    }

    getUserById(id) {
        return this.users[id];
    }

    getAllUsers() {
        return this.users;
    }

    addUserInfo(name, age) {
        this.users[id] = {name: name, age: age};
        return this.users[id++];
    }

    deleteUserById(id) {
        const user = this.users[id];
        delete this.users[id];
        return user;
    }

    updateUserInfo(id, name, age) {
        this.users[id] = {name:name, age:age};
        return this.users[id];
    }
}

const db = new DB;

module.exports = db;