import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import Joi from "joi";
import log from "./logger.js";
import authenticate from "./authenticator.js";

let courses = [
    { id: 1, name: "Node.js Course", author: "John Doe", about: "Learn the basics of Node.js", launchDate: "2023-01-15", duration: 20, level: "Beginner", rating: 4.5 },
    { id: 2, name: "Java", author: "Jane Smith", about: "Master Java programming", launchDate: "2023-02-20", duration: 30, level: "Intermediate", rating: 4.7 },
    { id: 3, name: "Python for Beginners", author: "Alice Johnson", about: "Introduction to Python", launchDate: "2023-03-10", duration: 15, level: "Beginner", rating: 4.6 },
    { id: 4, name: "React.js", author: "Bob Brown", about: "Learn React.js for frontend development", launchDate: "2023-04-05", duration: 25, level: "Intermediate", rating: 4.8 },
    { id: 5, name: "Angular", author: "Charlie White", about: "Comprehensive Angular course", launchDate: "2023-05-12", duration: 35, level: "Advanced", rating: 4.4 },
    { id: 6, name: "C++ Basics", author: "David Green", about: "Learn C++ programming from scratch", launchDate: "2023-06-18", duration: 18, level: "Beginner", rating: 4.3 },
    { id: 7, name: "Data Structures", author: "Eve Black", about: "Understand data structures in depth", launchDate: "2023-07-25", duration: 40, level: "Advanced", rating: 4.9 },
    { id: 8, name: "Machine Learning", author: "Frank Blue", about: "Introduction to Machine Learning", launchDate: "2023-08-30", duration: 50, level: "Intermediate", rating: 4.7 },
    { id: 9, name: "DevOps Essentials", author: "Grace Yellow", about: "Learn the basics of DevOps", launchDate: "2023-09-15", duration: 22, level: "Beginner", rating: 4.5 },
    { id: 10, name: "Cybersecurity", author: "Hank Red", about: "Introduction to cybersecurity concepts", launchDate: "2023-10-10", duration: 28, level: "Intermediate", rating: 4.6 },
];

let app = express();
// Built-in Middleware functions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
    console.log("Morgan enabled...");
  }

// Helmet helps you secure your Express apps by setting various HTTP headers
app.use(helmet());

// Custom Middleware function
// app.use((req, res, next) => {
//     console.log("Logging...");
//     next();
// });
app.use(log); // Using the imported logging middleware
// app.use((req, res, next) => {
//     console.log("Authenticating...");
//     next(); // Pass control to the next middleware function or route handler
// });
app.use(authenticate); // Using the imported authentication middleware

app.get("/", (req, res) => {
  res.send(`Hare Krishna Hare Krishna Krishna Krishna Hare Hare \n Hare Rama Hare Rama Rama Rama Hare Hare`);
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return courseNotFound(res, req.params.id);
    res.send(course);
});

app.post("/api/courses", (req, res) => {
    // This is our method we can use for validate the course
    let { error } = validateCourse(req.body);
    if (error) return sendErrorResponse(res, 400, error.details[0].message);

    // If validation passes, create the new course
    let course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return courseNotFound(res, req.params.id);
    let { error } = validateCourse(req.body);
    if (error) return sendErrorResponse(res, 400, error.details[0].message);
    course.name = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return courseNotFound(res, req.params.id);
    let index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

/// This is our method we can use for validate the course
function validateCourse(body) {
    const schema = Joi.object({
        name: Joi.string().min(3).required() // 'name' must be a string, at least 3 characters long, and is required
    });
    return schema.validate(body); // Return the result of Joi validation
}

// Helper function to send error responses
function sendErrorResponse(res, statusCode, message) {
    res.status(statusCode).json({ error: message });
}

// Helper function for course not found
function courseNotFound(res, id) {
    sendErrorResponse(res, 404, `The course with the given ID ${id} was not found`);
}   