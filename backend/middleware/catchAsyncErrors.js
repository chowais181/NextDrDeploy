//You want to have a middleware that catches all errors.
// There you can decide what to do with them and where
//to send them if they need to notify you via an alert notification.
// next() function to forward errors to the error handler middleware
// this function forward our error to error.js to show
// and server will not stop
module.exports = (fun) => (req, res, next) => {
  Promise.resolve(fun(req, res, next)).catch(next);
};

//here we make the single function for all the controllers error handling
// when the error occurs it will forward to the error handler middleware
