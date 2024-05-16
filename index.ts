import { configDotenv } from "dotenv";
import express, { Express, Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import cors from "cors"
import expenseRouter from "./routes/expenseRoutes";
import morgan  from 'morgan'
configDotenv({path:"./.env"})

const app: Express = express();
const port = process.env.APP_PORT || 3000; // Use environment variable or default to 3000

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors())
app.use(morgan('dev'));

app.get("/health-check", (req: Request, res: Response) => {
  res.send("Expensify is up and running!");
});

app.use('/auth', authRouter)
app.use('/expenses', expenseRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Node.js
// Express.js
