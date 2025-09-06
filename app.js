import helmet from "helmet";
import morgan from "morgan";
import config from "config";
import debug from "debug";
import express from "express";
import log from "./middleware/logger.js";
import authenticate from "./middleware/authenticator.js";
import coursesRouter from "./routes/courses.js";
import homeRouter from "./routes/home.js";

// Debugging
// We can enable debug logs by setting the environment variable DEBUG
// In Linux/Mac: export DEBUG=app:startup,app:db
// To enable all debug logs for all namespaces, use: export DEBUG=*
const startupDebugger = debug("app:startup");
const dbDebugger = debug("app:db");

let app = express();
// Built-in Middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Routes
app.use("/api/courses", coursesRouter); // Use the courses router for /api/courses routes
app.use("/", homeRouter); // Use the home router for the root route

// Set the view engine/templating engine to Pug
app.set("view engine", "pug");
app.set("views", "./views"); // Default folder for views

// Environment variables
// This returns 'undefned' by default if NODE_ENV is not set
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// This returns the development environment by default
// console.log(`app: ${app.get("env")}`);

// Third-party Middleware function
// Morgan is a HTTP request logger middleware for Node.js
// tiny is one of the predefined formats in Morgan
// For example: :method :url :status :res[content-length] - :response-time ms
// GET /api/courses 200 1689 - 2.851 ms
// Environment-based Middleware
if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    // console.log("Morgan enabled...");
    startupDebugger("Morgan enabled...");
  }

// Simulate a database connection
if (app.get("env") === "development") {
    dbDebugger("Connected to the database...");
}

// Configuration
// Configuration can be set in JSON files in the config folder
// Default file is default.json
// You can create custom configuration files for different environments
// For example, create a file named production.json for production environment
// To run the app in production mode, set the environment variable NODE_ENV to 'production'
// In Linux/Mac: export NODE_ENV=production
// To run the app in development mode, set the environment variable NODE_ENV to 'development'
// export NODE_ENV=development
// Accessing configuration values
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
//  To set the mail password, we need to set an environment variable
//  In Linux/Mac: export app_mail_password=your_password
//  Accessing the mail password from environment variable
// console.log("Mail Password: " + config.get("mail.password")); // This will throw an error if the password is not set in environment variables


// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// Custom Middleware function
// app.use((req, res, next) => {
//     console.log("Logging...");
//     next();
// });

// Using the imported logging middleware
app.use(log); 

// Using the imported authentication middleware
app.use(authenticate);

// Define the port to run the server on
// Use the PORT environment variable if set, otherwise default to 3000
// In Linux/Mac: export PORT=5000
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});