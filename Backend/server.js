const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

console.log("Mongo URI exists:", !!process.env.MONGO_URI);
console.log("Mongo URI exists:", !!process.env.MONGODB_URI);

connectToDB()


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})