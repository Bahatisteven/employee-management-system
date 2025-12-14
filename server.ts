import express from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(cors());
app.use(express.json())


//app.use('/api/process.env.PREFIX')

app.listen(5000,() =>
      console.log("app is running on port 5000 🔥")
)