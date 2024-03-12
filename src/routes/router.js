const express = require("express")

const router = express.Router()

router.all("/", (req, res) => {
    res.send("API endpoint")
})
router.use("/db", require("./db-router"))
router.use("/tv-program", require("./tv-program-router"))

module.exports = router
