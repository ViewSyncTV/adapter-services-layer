const db = require("../managers/db-manager")

class DbController {
    async getLastTvProgramUpdate(req, res) {
        try {
            req.log.info("Getting last TV program update from the database")
            const { data, error } = await db.rpc("tv_program_get_last_update")

            if (error) {
                throw new Error(error.message)
            }

            req.log.info("Db response is OK")

            const lastUpdate = data !== null ? data[0].tv_program_get_last_updatea : null
            res.send({ data: { last_update: lastUpdate } })
        } catch (error) {
            req.log.error(`Error getting last TV program update: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting last TV program update" } })
        }
    }

    async insertTvProgram(req, res) {
        try {
            const tvProgramData = req.body

            req.log.info(tvProgramData)

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
}

module.exports = DbController
