const axios = require("axios")
const { getWeekStartDatesInEpoch } = require("../../utils/utils")

const MEDIASET_BASE_URL =
    "https://api-ott-prod-fe.mediaset.net/PROD/play/feed/allListingFeedEpg/v2.0?"
const MEDIASET_PROGRAMS_RANGE_DATE_GET = `${MEDIASET_BASE_URL}byListingTime={startDate}~{endDate}&byCallSign={channelId}`

class MediasetTvProgramController {
    async getWeekProgramsForChannel(req, res) {
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
        res.send({ data: programs })
    }
}

module.exports = MediasetTvProgramController
