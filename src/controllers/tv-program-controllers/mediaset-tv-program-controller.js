const axios = require("axios")
const { getWeekStartDatesInEpoch } = require("../../utils/utils")

// eslint-disable-next-line no-unused-vars
const Types = require("../../types/types")

const MEDIASET_BASE_URL =
    "https://api-ott-prod-fe.mediaset.net/PROD/play/feed/allListingFeedEpg/v2.0?"
const MEDIASET_PROGRAMS_RANGE_DATE_GET = `${MEDIASET_BASE_URL}byListingTime={startDate}~{endDate}&byCallSign={channelId}`

/** Controller for the Mediaset TV program */
class MediasetTvProgramController {
    /**
     * Get week programs for a specific channel of the Mediaset list of channels
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<Types.TvProgram>>} The list of programs for the channel
     * @throws Will throw an error if the request fails
     */
    async getWeekProgramsForChannel(req, res) {
        /** @type {Types.TvProgram[]} */
        var programs = []

        for (let startDate of getWeekStartDatesInEpoch()) {
            const endDate = (parseInt(startDate) + 86400000).toString()

            const channelId = req.params.channelId
            var url = MEDIASET_PROGRAMS_RANGE_DATE_GET

            url = url.replace("{startDate}", startDate)
            url = url.replace("{endDate}", endDate)
            url = url.replace("{channelId}", channelId)

            req.log.info(`Calling Mediaset API: ${url}`)
            const response = await axios.get(url)

            if (response.status == 200 && response.data.isOk == true) {
                programs = programs.concat(response.data.response.entries)
            }
        }

        req.log.info("Mediaset API response is OK")

        /** @type {Types.ApiResponse<Types.TvProgram>} */
        const response = {data: programs}

        res.send(response)
    }
}

module.exports = MediasetTvProgramController
