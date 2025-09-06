import express from "express";
import Joi from "joi";

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

let router = express.Router();

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return courseNotFound(res, req.params.id);
    res.send(course);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return courseNotFound(res, req.params.id);
    let { error } = validateCourse(req.body);
    if (error) return sendErrorResponse(res, 400, error.details[0].message);
    course.name = req.body.name;
    res.send(course);
});

router.delete("/:id", (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return courseNotFound(res, req.params.id);
    let index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
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

export default router;