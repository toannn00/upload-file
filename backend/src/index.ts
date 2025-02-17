import App from "./app";
import dotenv from "dotenv";
import { logger } from "./utils/logger";

dotenv.config();

const app = new App().app;
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
