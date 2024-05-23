const db = require("../managers/db-manager")
const { getTodayRangeInISOString, getWeekRangeInISOString } = require("../utils/utils")

// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")

/**
 * Controller that handles the database operations
 * @class
 * @memberof Controllers
 */
class DbController {
    /**
     * Get the last update date of the table TV Program on the database
     * @function
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<?string>>} The last update date of the TV program table
     * @throws Will throw an error if the database response is an error
     */
    async getLastTvProgramUpdate(req, res) {
        req.log.info("Getting last TV program update from the database")
        const { data, error } = await db.rpc("tv_program_get_last_update")

        if (error) {
            throw new Error(error.message)
        }

        req.log.info("Db response is OK")

        /** @type {?string} */
        const lastUpdate = data

        /** @type {Types.ApiResponse<?string>} */
        const response = { data: lastUpdate }

        res.send(response)
    }

    /**
     * Insert a TV program into the database
     * @async
     * @param {Types.Request<Types.TvProgram[]>} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<any>>} Ok response or error
     * @throws Will throw an error if the database response is an error
     */
    async insertTvProgram(req, res) {
        /** @type {Types.TvProgram[]} */
        const tvProgramData = req.body

        req.log.info("Inserting TV program into the database")

        const { data, error } = await db.rpc("tv_program_insert", {
            tv_programs_json: tvProgramData,
        })

        if (error) {
            throw new Error(error.message)
        }

        req.log.info("Db response is OK")
        res.send({ data: data })
    }

    /**
     * Get today's TV program from the database
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram[]>>} The list of TV programs for today
     * @throws Will throw an error if the database response is an error
     */
    async getTodayTvProgram(req, res) {
        req.log.info("Getting today's TV program from the database")

        const { startDate, endDate } = getTodayRangeInISOString()
        const { data, error } = await db.rpc("tv_program_in_range_get", {
            start_time_range: startDate,
            end_time_range: endDate,
        })

        if (error) {
            throw new Error(error.message)
        }

        /** @type {Types.ApiResponse<Types.TvProgram[]>} */
        const response = { data: data }

        req.log.info("Db response is OK")
        res.send(response)
    }

    /**
     * Get week's TV programs from the database
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram[]>>} The list of TV programs for the week
     * @throws Will throw an error if the database response is an error
     */
    async getWeekTvProgram(req, res) {
        req.log.info("Getting week's TV program from the database")

        const { startDate, endDate } = getWeekRangeInISOString()
        const { data, error } = await db.rpc("tv_program_in_range_get", {
            start_time_range: startDate,
            end_time_range: endDate,
        })

        if (error) {
            throw new Error(error.message)
        }

        /** @type {Types.ApiResponse<Types.TvProgram[]>} */
        const response = { data: data }

        req.log.info("Db response is OK")
        res.send(response)
    }

    /**
     * Get the list of channels that Rai broadcasts
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvChannel[]>>} The list of Rai channels
     * @throws Will throw an error if the database response is an error
     */
    async getRaiChannelList(req, res) {
        req.log.info("Getting Rai channel list from the database")

        const { data, error } = await db.rpc("channel_list_get", { company_p: "Rai" })

        if (error) {
            throw new Error(error.message)
        }

        /** @type {Types.ApiResponse<Types.TvChannel>} */
        const response = { data: data }

        req.log.info("Db response is OK")
        res.send(response)
    }

    /**
     * Get the list of channels that Mediaset broadcasts
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvChannel[]>>} The list of Mediaset channels
     * @throws Will throw an error if the database response is an error
     */
    async getMediasetChannelList(req, res) {
        req.log.info("Getting Mediaset channel list from the database")

        const { data, error } = await db.rpc("channel_list_get", { company_p: "Mediaset" })

        if (error) {
            throw new Error(error.message)
        }

        req.log.info("Db response is OK")
        res.send({ data: data })
    }
}

module.exports = DbController
