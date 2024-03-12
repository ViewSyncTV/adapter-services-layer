const express = require("express")
const DbController = require("../controllers/db-controller")

const router = express.Router()
const dbController = new DbController()

router.get("/", (req, res) => {
    res.send("This is the DB endpoint!")
})

router.get("/all", dbController.getAllPrograms)

module.exports = router
