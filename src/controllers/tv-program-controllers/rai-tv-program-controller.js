const axios = require("axios")

const RAI_BASE_URL = "https://www.raiplay.it/palinsesto/app"
const RAI_PROGRAMS_RANGE_DATE_GET = `${RAI_BASE_URL}/{channelId}/{date}.json`

class RaiTvProgramController {
    async getWeekProgramsForChannel(req, res) {
        const channelId = req.params.channelId
        var programs = []

        for (let i = 0; i < 7; i++) {
            var day = new Date()
            day.setDate(day.getDate() + i)
            var dayStr = day.toLocaleString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            dayStr = dayStr.replace(/\//g, "-")

            var url = RAI_PROGRAMS_RANGE_DATE_GET
            url = url.replace("{date}", dayStr)
            url = url.replace("{channelId}", channelId)

            req.log.info(`Calling Rai API: ${url}`)

            const responseDay = await axios.get(url)

            if (responseDay.status == 200) {
                programs = programs.concat(responseDay.data.events)
            }
        }

        req.log.info("Rai API response is OK")
        res.send({ data: programs })
    }
}

module.exports = RaiTvProgramController
