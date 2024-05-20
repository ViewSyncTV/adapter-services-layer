/**
 * @template T
 * @typedef {import("express").Request & {log: import("pino").Logger, body: T}} Request
 */

/**
 * @typedef {import("express").Response} Response
 */

/**
 * @template T
 * @typedef {object} ApiResponse - The response object of the APIs functions
 * @property {T} [data] - The data object in case of success
 * @property {ErrorObject} [error] - The error object in case of failure
 */

/**
 * @typedef {object} ErrorObject - The error object in case of failure in the APIs functions
 * @property {number} code - The error code number
 * @property {string} message - The error message
 */

/**
 * @typedef {object} TvProgram - The TV program object
 * @property {string} channel_id - The id of the channel broadcasting the program
 * @property {string} title - The title of the TV program
 * @property {string} description - The description of the program
 * @property {string} category - The category of the program
 * @property {Date} start_time - The start time of the TvProgram
 * @property {Date} end_time - The end time of the TvProgram
 */

/**
 *@typedef {object} TvChannel - The channel object
 *@property {string} id - The id of the channel
 *@property {string} description - The description of the channel
 * @property {string} company - The company that owns the channel
 */

module.exports = {}
