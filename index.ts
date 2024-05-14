import { configDotenv } from "dotenv";
import express, { Express, Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import cors from "cors"
configDotenv({path:"./.env"})

const app: Express = express();
const port = process.env.APP_PORT || 3000; // Use environment variable or default to 3000

app.use(express.json());
app.use(cors())

app.get("/health-check", (req: Request, res: Response) => {
  res.send("Expensify is up and running!");
});

app.use('/auth', authRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
