const db = require("../managers/db-manager")
const { getTodayRangeInISOString, getWeekRangeInISOString } = require("../utils/utils")

class DbController {
    async getLastTvProgramUpdate(req, res) {
        req.log.info("Getting last TV program update from the database")
        const { data, error } = await db.rpc("tv_program_get_last_update")

        if (error) {
            throw new Error(error.message)
        }

        req.log.info("Db response is OK")

        const lastUpdate = data !== null ? data : null
        res.send({ data: lastUpdate })
    }

    async insertTvProgram(req, res) {
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

        req.log.info("Db response is OK")
        res.send({ data: data })
    }

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

        req.log.info("Db response is OK")
        res.send({ data: data })
    }

    async getRaiChannelList(req, res) {
        req.log.info("Getting Rai channel list from the database")

        const { data, error } = await db.rpc("channel_list_get", { company_p: "Rai" })

        if (error) {
            throw new Error(error.message)
        }

        req.log.info("Db response is OK")
        res.send({ data: data })
    }

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
