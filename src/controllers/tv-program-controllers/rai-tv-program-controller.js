const axios = require("axios")

const RAI_BASE_URL = "https://www.raiplay.it/palinsesto/app"
const RAI_PROGRAMS_RANGE_DATE_GET = `${RAI_BASE_URL}/{channelId}/{date}.json`

class RaiTvProgramController {
    async getTodayProgramsForChannel(req, res) {
        try {
            // get today's date in the format DD-MM-YYYY
            const today = new Date()
            var todayStr = today.toLocaleString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            todayStr = todayStr.replace(/\//g, "-")

            const channelId = req.params.channelId

            var url = RAI_PROGRAMS_RANGE_DATE_GET
            url = url.replace("{date}", todayStr)
            url = url.replace("{channelId}", channelId)

            req.log.info(`Calling Rai API: ${url}`)

            const response = await axios.get(url)

            if (response.status == 200) {
                req.log.info("Rai API response is OK")
                res.send({ data: response.data })
            } else {
                throw new Error("Bad response from Rai API")
            }
        } catch (error) {
            req.log.error(`Error getting today's programs: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting today's programs" } })
        }
    }
}

module.exports = RaiTvProgramController
