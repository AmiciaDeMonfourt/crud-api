const url = require("url");
const user_controller = require("../controllers/user.controller");

const router = (req, res) => {
    path = url.parse(req.url, true).pathname;
    method = req.method;

    res.setHeader("Content-type", "application/json");
        
    if(path == "/users") {
        switch(method) {
            case "GET":
                user_controller.getAllUsers(req, res);
                break;
    
            case "POST":
                user_controller.createUser(req, res);
                break;

            default:
                console.log(`unknown method in : '${path}'`);
                res.writeHead(404);
                res.end(JSON.stringify({message: "Unknown path"}));
                break;
        }
    } else if(path.startsWith("/users/")) {
        switch(method) {
            case "GET": 
                user_controller.getUser(req, res);
                break;
            
            case "PUT":
                user_controller.updateUser(req, res);
                break;
            
            case "DELETE":
                user_controller.deleteUser(req, res);
                break;
            
            default:
                console.log(`unknown method in : '${path}'`);
                res.writeHead(404);
                res.end(JSON.stringify({message: "Unknown path"}));
                break;        
        }
    } else {
        console.log(`unknown url: '${path}'`);
        res.writeHead(404);
        res.end(JSON.stringify({message: "Unknown path"}));
    }
}

module.exports = router;
