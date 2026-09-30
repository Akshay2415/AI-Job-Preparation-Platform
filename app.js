require("dotenv").config();
const app = require("./src/server")
const connectDB = require("./src/db/db")

connectDB();

app.listen(3000, ()=>{
    console.log("Server is listening to port 3000")
});

