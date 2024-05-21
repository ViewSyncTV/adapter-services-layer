/**
 * This file contains utility functions that are used in the main application.
 * @namespace Utils
 */

/**
 * Convert a date object to epoch time
 * @param {Date} date - The date to convert
 * @returns {string} The epoch time
 * @memberof Utils
 */
function dateToEpoch(date) {
    date.setHours(0, 0, 0, 0)
    return date.getTime().toString().padEnd(13, "0")
}

/**
 * Get the dates of every day of the next 7 days in epoch time
 * @returns {Array<string>} The start dates of the week in epoch time
 * @memberof Utils
 */
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

/**
 * Get the start and end date of the current week in ISO string format
 * @returns {object} The start and end date of the current week in ISO string format
 * @property {Date} startDate - The start date of the current week.
 * @property {Date} endDate - The end date of the current week.
 * @memberof Utils
 */
function getWeekRangeInISOString() {
    const today = new Date().setHours(0, 0, 0, 0)
    const startDate = new Date(today).toISOString().toLocaleString("it-IT")

    const nextWeek = new Date()
    nextWeek.setDate(nextWeek.getDate() + 7)
    nextWeek.setHours(0, 0, 0, 0)
    const endDate = nextWeek.toISOString().toLocaleString("it-IT")

    return { startDate, endDate }
}

/**
 * Get the start and end date of today in ISO string format
 * @returns {object} The start and end date of today in ISO string format
 * @property {Date} startDate - The start date of today.
 * @property {Date} endDate - The end date of today.
 * @memberof Utils
 */
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
    getWeekStartDatesInEpoch,
    getWeekRangeInISOString,
    getTodayRangeInISOString,
}
