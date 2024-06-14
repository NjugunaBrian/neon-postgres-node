import express from "express";
import dotenv from "dotenv";
import { createUser, updateUser, deleteUser, getUsers, getUserById } from "./queries"

dotenv.config()

const app  = express();
const port = process.env.PORT || 3001

//middleware to parse JSON requests
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get("/", (_req, res) => {
    res.json({ info: "Node.js, Express and Postgres API"})
})

app.post("/createuser", createUser);
app.put("/updateuser", updateUser);
app.get("/users", getUsers);
app.get("/user", getUserById);
app.delete("/deleteuser", deleteUser);