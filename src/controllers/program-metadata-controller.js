const axios = require("axios")

const THE_MOVIE_DB_API_URL = "https://api.themoviedb.org/3"
const THE_MOVIE_DB_API_KEY = process.env.THE_MOVIE_DB_API_KEY || ""

const SEARCH_MOVIE = `${THE_MOVIE_DB_API_URL}/search/movie?query={query}&language=it-IT&page=1`
const SEARCH_TV_SHOW = `${THE_MOVIE_DB_API_URL}/search/tv?query={query}&language=it-IT&page=1`

const GET_MOVIE_DETAILS = `${THE_MOVIE_DB_API_URL}/movie/{id}?language=it-IT`
const GET_TV_SHOW_DETAILS = `${THE_MOVIE_DB_API_URL}/tv/{id}?language=it-IT`

const headers = {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${THE_MOVIE_DB_API_KEY}`,
    },
}

/**
 * Controller that handles the fetch of the program metadata using the TMDB API
 * @memberof Controllers
 */
class ProgramMetadataController {
    constructor() {}

    /**
     * Search movie by query
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<any>>} The list of movies compatible with the query
     * @throws Will throw an error if the request fails
     */
    async searchMovies(req, res) {
        const query = req.params.query
        const adaptedQuery = encodeURIComponent(query)

        var url = SEARCH_MOVIE.replace("{query}", adaptedQuery)
        req.log.info(`Calling TMDB API: ${url}`)

        const response = await axios.get(url, headers)

        req.log.info("TMDB API response is OK")
        res.send({ data: response.data })
    }

    /**
     * Search tv show by query
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<any>>} The list of tv shows compatible with the query
     * @throws Will throw an error if the request fails
     */
    async searchTvShows(req, res) {
        const query = req.params.query
        const adaptedQuery = encodeURIComponent(query)

        var url = SEARCH_TV_SHOW.replace("{query}", adaptedQuery)
        req.log.info(`Calling TMDB API: ${url}`)

        const response = await axios.get(url, headers)

        req.log.info("TMDB API response is OK")
        res.send({ data: response.data })
    }

    /**
     * Get movie details by id using the TMDB API
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<any>>} The details of the movie
     * @throws Will throw an error if the request fails
     */
    async getMovieDetails(req, res) {
        const id = req.params.id

        var url = GET_MOVIE_DETAILS.replace("{id}", id)
        req.log.info(`Calling TMDB API: ${url}`)

        const response = await axios.get(url, headers)

        req.log.info("TMDB API response is OK")
        res.send({ data: response.data })
    }

    /**
     * Get tv show details by id using the TMDB API
     * @async
     * @param {Types.Request} req - The request object
     * @param {Types.Response} res - The response object
     * @returns {Promise<Types.ApiResponse<any>>} The details of the tv show
     * @throws Will throw an error if the request fails
     */
    async getTvShowDetails(req, res) {
        const id = req.params.id

        var url = GET_TV_SHOW_DETAILS.replace("{id}", id)
        req.log.info(`Calling TMDB API: ${url}`)

        const response = await axios.get(url, headers)

        req.log.info("TMDB API response is OK")
        res.send({ data: response.data })
    }
}

module.exports = ProgramMetadataController
