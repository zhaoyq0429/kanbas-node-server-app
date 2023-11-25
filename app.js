import "dotenv/config";
import express from "express";
import HelloRoutes from "./hello.js"
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";



const app = express();
app.use(express.json());
app.use(cors());

ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);

app.listen(process.env.PORT || 4000);