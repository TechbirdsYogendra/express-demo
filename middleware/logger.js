function log(req, res, next) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
}
export default log; 