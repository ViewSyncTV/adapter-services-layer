/**
 * @namespace Router
 * @category API
 * @requires express
 */

const express = require("express")

const router = express.Router()

/**
 * Base route of the API
 * @name Base
 * @route {GET} /api
 * @memberof Router
 */
router.all("/", (req, res) => {
    res.send("API endpoint")
})

router.use("/db", require("./db-router"))
router.use("/tv-program", require("./tv-program-router"))
router.use("/program-metadata", require("./program-metadata-router"))

module.exports = router
