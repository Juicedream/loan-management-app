import express from "express";
import morgan from "morgan";
import path from "path";
const port = process.env.PORT || 7000;
const app = express();
import { errorHandler } from "./middlewares/errorHandler.js";
import { accessLogStream } from "./loggers/access.logger.js";
import { fileURLToPath } from "url";

//routes
import userRoutes from "./routes/user.route.js";
import loanRoutes from "./routes/loan.routes.js";

app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());

app.use(
  morgan("common", {
    stream: accessLogStream,
  })
);

app.get("/", (req: any, res: any) => {
  res.render("index", {
    title: "Dashboard",
    message: "Loan management app",
  });
});

app.get("/login", (req: any, res: any) => {
  res.render("login", {});
});

app.get("/register", (req: any, res: any) => {
  res.render("register", {});
});
app.get("/loan/:loanId", (req: any, res: any) => {
   const {loanId} = req.params; 
  res.render("loanPage", {loanId});
});

// all routes
app.use("/users", userRoutes);
app.use("/loans", loanRoutes);

// error handler middleware
app.use(errorHandler);

app.use((req:any, res:any) => {
    res.render("notFound")
})

// app server
export function appServer() {
  app.listen(port, () => {
    console.log(
      `Server runnning on port: ${port} access via http://localhost:${port}`
    );
  });
}
