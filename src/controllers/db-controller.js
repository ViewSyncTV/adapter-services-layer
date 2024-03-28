const db = require("../managers/db-manager")
const { getTodayRangeInISOString } = require("../utils/utils")

class DbController {
    async getLastTvProgramUpdate(req, res) {
        try {
            req.log.info("Getting last TV program update from the database")
            const { data, error } = await db.rpc("tv_program_get_last_update")

            if (error) {
                throw new Error(error.message)
            }

            req.log.info("Db response is OK")

            const lastUpdate = data !== null ? data : null
            res.send({ data: lastUpdate })
        } catch (error) {
            req.log.error(`Error getting last TV program update: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting last TV program update" } })
        }
    }

    async insertTvProgram(req, res) {
        try {
            const tvProgramData = req.body

            req.log.info("Inserting TV program into the database")

            const { data, error } = await db.rpc("tv_program_insert", {
                tv_programs_json: tvProgramData,
            })

            if (error) {
                req.log.error(error)
                throw new Error(error.message)
            }

            req.log.info("Db response is OK")
            res.send({ data: data })
        } catch (error) {
            req.log.error(`Error inserting TV program: ${error.message}`)
            res.status(500).send({ error: { message: "Error inserting TV program" } })
        }
    }

    async getTodayTvProgram(req, res) {
        try {
            req.log.info("Getting today's TV program from the database")

            const { startDate, endDate } = getTodayRangeInISOString()
            const { data, error } = await db.rpc("tv_program_in_range_get", {
                start_time_range: startDate,
                end_time_range: endDate,
            })

            if (error) {
                req.log.error(error)
                throw new Error(error.message)
            }

            req.log.info("Db response is OK")
            res.send({ data: data })
        } catch (error) {
            req.log.error(`Error getting today's TV program: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting today's TV program" } })
        }
    }

    async getRaiChannelList(req, res) {
        try {
            req.log.info("Getting Rai channel list from the database")

            const { data, error } = await db.rpc("channel_list_get", { company_p: "Rai" })

            if (error) {
                req.log.error(error)
                throw new Error(error.message)
            }

            req.log.info("Db response is OK")
            res.send({ data: data })
        } catch (error) {
            req.log.error(`Error getting Rai channel list: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting Rai channel list" } })
        }
    }

    async getMediasetChannelList(req, res) {
        try {
            req.log.info("Getting Mediaset channel list from the database")

            const { data, error } = await db.rpc("channel_list_get", { company_p: "Mediaset" })

            if (error) {
                req.log.error(error)
                throw new Error(error.message)
            }

            req.log.info("Db response is OK")
            res.send({ data: data })
        } catch (error) {
            req.log.error(`Error getting Mediaset channel list: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting Mediaset channel list" } })
        }
    }
}

module.exports = DbController
