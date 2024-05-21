/**
 * @namespace Router.Db
 * @category API
 * @requires express
 */

const express = require("express")
const DbController = require("../controllers/db-controller")
const { asyncHandler } = require("../middleware/error-handler")

// eslint-disable-next-line no-unused-vars
const Types = require("../types/types")

const Router = require("./router")

const router = express.Router()

const dbController = new DbController()

/**
 * Base route of the database API
 * @name Base
 * @route {GET} /api/db
 * @memberof Router.Db
 */
router.get("/", (req, res) => {
    res.send("This is the Db endpoint!")
})

/**
 * @namespace Router.Db.TvProgram
 * @category API
 * @requires express
 */
const tvProgramRouter = express.Router()

/**
 * Get the date of the last update of the TV programs in the database
 * @name GetLastUpdate
 * @route {GET} /api/db/tv-program/get-last-update
 * @memberof Router.Db.TvProgram
 */
tvProgramRouter.get("/get-last-update", asyncHandler(dbController.getLastTvProgramUpdate))

/**
 * Insert a list of TV programs in the database
 * @name TvProgramsInsert
 * @route {POST} /api/db/tv-program/insert
 * @bodyparam {Array<Types.TvProgram>} tvPrograms - The list of TV programs to insert
 * @memberof Router.Db.TvProgram
 */
tvProgramRouter.post("/insert", asyncHandler(dbController.insertTvProgram))

/**
 * Get the TV programs of today
 * @name TvProgramsTodayGet
 * @route {GET} /api/db/tv-program/today
 * @memberof Router.Db.TvProgram
 */
tvProgramRouter.get("/today", asyncHandler(dbController.getTodayTvProgram))

/**
 * Get the TV Programs of the week
 * @name TvProgramsWeekGet
 * @route {GET} /api/db/tv-program/week
 * @memberof Router.Db.TvProgram
 */
tvProgramRouter.get("/week", asyncHandler(dbController.getWeekTvProgram))

/**
 * Get the list of the RAI channels
 * @name ChannelsListGetRai
 * @route {GET} /api/db/tv-program/rai-channel-list
 * @memberof Router.Db.TvProgram
 */
tvProgramRouter.get("/rai-channel-list", asyncHandler(dbController.getRaiChannelList))

/**
 * Get the list of the Mediaset channels
 * @name ChannelsListGetMediaset
 * @route {GET} /api/db/tv-program/mediaset-channel-list
 * @memberof Router.Db.TvProgram
 */
tvProgramRouter.get("/mediaset-channel-list", asyncHandler(dbController.getMediasetChannelList))

router.use("/tv-program", tvProgramRouter)

module.exports = router
