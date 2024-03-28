function dateToEpoch(date) {
    date.setHours(0, 0, 0, 0)
    return date.getTime().toString().padEnd(13, "0")
}

function getWeekStartDatesInEpoch() {
    var dataRanges = []

    for (let i = 0; i < 7; i++) {
        const dayBegin = new Date()
        dayBegin.setDate(dayBegin.getDate() + i)
        const startDate = dateToEpoch(dayBegin)

        dataRanges.push(startDate)
    }

    return dataRanges
}

function getWeekRangeInISOString() {
    const today = new Date().setHours(0, 0, 0, 0)
    const startDate = new Date(today).toISOString().toLocaleString("it-IT")

    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextWeek.setHours(0, 0, 0, 0)
    const endDate = nextWeek.toISOString().toLocaleString("it-IT")

    return { startDate, endDate }
}

module.exports = {
    dateToEpoch,
    getWeekStartDatesInEpoch,
    getWeekRangeInISOString,
}
