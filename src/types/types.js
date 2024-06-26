const { Logger } = require("pino")
const { Response, Request } = require("express")

/** @namespace Types */

/**
 * @template T
 * @typedef {Request} Request
 * @property {T} [body] - The body object
 * @property {Logger} log - The logger object
 * @memberof Types
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

/**
 * @typedef {object} Favorite - The favorite object
 * @property {?string} user_email - The email of the user
 * @property {?string} movie_id - The id of the movie
 * @property {?string} tvshow_id - The id of the tv show
 * @property {?string} title - The title of the favorite
 * @memberof Types
 */

/**
 * @typedef {object} Reminder - The reminder object
 * @property {?string} user_email - The email of the user
 * @property {?string} tvprogram_id - The id of the tv program
 * @memberof Types
 */

module.exports = {}
