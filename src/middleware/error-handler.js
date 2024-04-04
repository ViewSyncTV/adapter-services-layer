/**
 * Error handler middleware
 * Avoid try-catch blocks in controllers
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

/**
 * Error handler middleware
 * Handle the logging and response to the client in case of errro
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    req.log.error(err.stack)

    let statusCode = 500
    if (err.response) {
        statusCode = err.response.status
    }

    res.status(statusCode)
    res.send({
        error: {
            status: statusCode,
            code: err.code || "INTERNAL_SERVER_ERROR",
            message: err.message || "Internal Server Error",
        },
    })
}

module.exports = {
    asyncHandler,
    errorHandler,
}
