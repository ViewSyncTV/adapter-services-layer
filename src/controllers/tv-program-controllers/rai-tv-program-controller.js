const axios = require("axios")

// eslint-disable-next-line no-unused-vars
const Types = require("../../types/types")

const RAI_BASE_URL = "https://www.raiplay.it/palinsesto/app"
const RAI_PROGRAMS_RANGE_DATE_GET = `${RAI_BASE_URL}/{channelId}/{date}.json`

/** Controller for the Rai TV program */
class RaiTvProgramController {
    /**
     * Get week programs for a specific channel of the Rai list of channels
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram>>} The list of programs for the channel
     * @throws Will throw an error if the request fails
     */
    async getWeekProgramsForChannel(req, res) {
        const channelId = req.params.channelId

        /** @type {Types.TvProgram[]} */
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

        /** @type {Types.ApiResponse<Types.TvProgram>} */
        const response = { data: programs }

        req.log.info("Rai API response is OK")
        res.send(response)
    }
}

module.exports = RaiTvProgramController
