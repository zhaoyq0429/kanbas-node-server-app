import "dotenv/config";
// import session from "express-session";
import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentsRoutes from "./assignments/routes.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL
        : process.env.FRONTEND_URL_LOCAL,
  })
);
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
AssignmentsRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);
