import "dotenv/config";
import app from "./src/app/app.js";
import connectDB from "./src/config/db.js";

const port = process.env.port || 4000;

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
};

startServer();
