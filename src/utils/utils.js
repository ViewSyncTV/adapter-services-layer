function dateToEpoch(date) {
    date.setHours(0, 0, 0, 0)
    return date.getTime().toString().padEnd(13, "0")
}

function getTodayRangeInEpoch() {
    const today = new Date()
    const startDate = dateToEpoch(today)

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const endDate = dateToEpoch(tomorrow)

    return { startDate, endDate }
}

function getTodayRangeInISOString() {
    const today = new Date().setHours(0, 0, 0, 0)
    const startDate = new Date(today).toISOString().toLocaleString("it-IT")

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const endDate = tomorrow.toISOString().toLocaleString("it-IT")

    return { startDate, endDate }
}

module.exports = {
    dateToEpoch,
    getTodayRangeInEpoch,
    getTodayRangeInISOString,
}
