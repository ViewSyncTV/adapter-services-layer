/**
 * @namespace Router.TvProgram
 * @category API
 * @requires express
 */

const express = require("express")
const MediasetTvProgramController = require("../controllers/tv-program-controllers/mediaset-tv-program-controller")
const RaiTvProgramController = require("../controllers/tv-program-controllers/rai-tv-program-controller")
const { asyncHandler } = require("../middleware/error-handler")

// eslint-disable-next-line no-unused-vars
const Router = require("./router")

const router = express.Router()
const mediasetTvProgramController = new MediasetTvProgramController()
const raiTvProgramController = new RaiTvProgramController()

/**
 * Base route of the TV Programs API
 * @name Base
 * @route {GET} /api/tv-program
 * @memberof Router.TvProgram
 */
router.get("/", (req, res) => {
    res.send("This is the TV Programs API endpoint!")
})

const mediasetRouter = express.Router()

/**
 * Get the TV programs of today for a specific Mediaset channel
 * @name MediasetTodayGet
 * @route {GET} /api/tv-program/mediaset/today/:channelId
 * @routeparam {string} :channelId - The id of the channel
 * @memberof Router.TvProgram
 */
mediasetRouter.get(
    "/week/:channelId",
    asyncHandler(mediasetTvProgramController.getWeekProgramsForChannel),
)
router.use("/mediaset", mediasetRouter)

const raiRouter = express.Router()

/**
 * Get the TV programs of today for a specific Rai channel
 * @name RaiTodayGet
 * @route {GET} /api/tv-program/rai/today/:channelId
 * @routeparam {string} :channelId - The id of the channel
 * @memberof Router.TvProgram
 */
raiRouter.get("/week/:channelId", asyncHandler(raiTvProgramController.getWeekProgramsForChannel))
router.use("/rai", raiRouter)

module.exports = router
