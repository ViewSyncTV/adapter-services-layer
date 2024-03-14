const axios = require("axios")

const MEDIASET_BASE_URL =
    "https://api-ott-prod-fe.mediaset.net/PROD/play/feed/allListingFeedEpg/v2.0?"
const MEDIASET_PROGRAMS_RANGE_DATE_GET = `${MEDIASET_BASE_URL}byListingTime={startDate}~{endDate}&byCallSign={channelId}`

function dateToEpoch(date) {
    date.setHours(0, 0, 0, 0)
    return date.getTime().toString().padEnd(13, "0")
}

class MediasetTvProgramController {
    async getTodayProgramsForChannel(req, res) {
        try {
            const today = new Date()
            const startDate = dateToEpoch(today)

            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            const endDate = dateToEpoch(tomorrow)

            const channelId = req.params.channelId

            var url = MEDIASET_PROGRAMS_RANGE_DATE_GET

            url = url.replace("{startDate}", startDate)
            url = url.replace("{endDate}", endDate)
            url = url.replace("{channelId}", channelId)

            req.log.info(`Calling Mediaset API: ${url}`)

            const response = await axios.get(url)

            if (response.status == 200 && response.data.isOk == true) {
                req.log.info("Mediaset API response is OK")
                res.send({ data: response.data.response})
            } else {
                throw new Error("Bad response from Mediaset API")
            }
        } catch (error) {
            req.log.error(`Error getting today's programs: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting today's programs" } })
        }
    }
}

module.exports = MediasetTvProgramController
