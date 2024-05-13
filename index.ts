import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
