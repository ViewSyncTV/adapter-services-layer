/**
 * @namespace API.TvProgram
 * @category API
 * @subcategory External Resources
 * @requires express
 */

const express = require("express")
const MediasetTvProgramController = require("../controllers/tv-program-controllers/mediaset-tv-program-controller")
const RaiTvProgramController = require("../controllers/tv-program-controllers/rai-tv-program-controller")
const { asyncHandler } = require("../middleware/error-handler")

// eslint-disable-next-line no-unused-vars
const API = require("./router")

const router = express.Router()
const mediasetTvProgramController = new MediasetTvProgramController()
const raiTvProgramController = new RaiTvProgramController()

/**
 * Base route of the TV Programs API
 * @name Root
 * @route {GET} /api/tv-program
 * @memberof API.TvProgram
 */
router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

const mediasetRouter = express.Router()

/**
 * Get the TV programs of the week for a specific Mediaset channel
 * @name MediasetTodayGet
 * @route {GET} /api/tv-program/mediaset/week/:channelId
 * @routeparam {string} :channelId - The id of the channel
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/mediaset/week/C5
 *
 * // Example of response
 * {
 *  "data": [
 *     // The response structure and fields are defined by the Mediaset API.
 *     // Refer to the Mediaset API documentation for detailed information.
 *   ]
 * }
 */
mediasetRouter.get(
    "/week/:channelId",
    asyncHandler(mediasetTvProgramController.getWeekProgramsForChannel),
)
router.use("/mediaset", mediasetRouter)

const raiRouter = express.Router()

/**
 * Get the TV programs of the week for a specific Rai channel
 * @name RaiTodayGet
 * @route {GET} /api/tv-program/rai/week/:channelId
 * @routeparam {string} :channelId - The id of the channel
 * @memberof API.TvProgram
 * @example
 * // Example of request
 * GET /api/tv-program/rai/week/rai-1
 *
 * // Example of response
 * {
 *  "data": [
 *     // The response structure and fields are defined by the Mediaset API.
 *     // Refer to the Mediaset API documentation for detailed information.
 *   ]
 * }
 */
raiRouter.get("/week/:channelId", asyncHandler(raiTvProgramController.getWeekProgramsForChannel))
router.use("/rai", raiRouter)

module.exports = router
