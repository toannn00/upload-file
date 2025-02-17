import App from "./app";
import { logger } from "./utils/logger";

const app = new App().app;
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
