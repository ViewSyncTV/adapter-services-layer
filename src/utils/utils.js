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

module.exports = {
    dateToEpoch,
    getTodayRangeInEpoch,
}
