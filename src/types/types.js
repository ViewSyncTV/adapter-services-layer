const { Logger } = require("pino")
const { Response, Request } = require("express")
const NameSpaces = require("./namespaces")

/**
 * @template T
 * @typedef {Request} Request
 * @property {T} [body] - The body object
 * @property {Logger} log - The logger object
 * @memberof NameSpaces.Types
 */

/**
 * @template T
 * @typedef {Response} Response
 * @memberof Types
 */

/**
 * @template T
 * @typedef {object} ApiResponse - The response object of the APIs functions
 * @property {T} [data] - The data object in case of success
 * @property {ErrorObject} [error] - The error object in case of failure
 * @memberof Types
 */

/**
 * @typedef {object} ErrorObject - The error object in case of failure in the APIs functions
 * @property {number} code - The error code number
 * @property {string} message - The error message
 * @memberof Types
 */

/**
 * @typedef {object} TvProgram - The TV program object
 * @property {string} channel_id - The id of the channel broadcasting the program
 * @property {string} title - The title of the TV program
 * @property {string} description - The description of the program
 * @property {string} category - The category of the program
 * @property {Date} start_time - The start time of the TvProgram
 * @property {Date} end_time - The end time of the TvProgram
 * @memberof Types
 */

/**
 * @typedef {object} TvChannel - The channel object
 * @property {string} id - The id of the channel
 * @property {string} description - The description of the channel
 * @property {string} company - The company that owns the channel
 * @memberof Types
 */

module.exports = {}
