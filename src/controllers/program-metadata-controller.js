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

class ProgramMetadataController {
    constructor() {}

    async searchMovies(req, res) {
        const query = req.params.query
        const adaptedQuery = encodeURIComponent(query)

        var url = SEARCH_MOVIE.replace("{query}", adaptedQuery)
        req.log.info(`Calling TMDB API: ${url}`)

        const response = await axios.get(url, headers)

        req.log.info("TMDB API response is OK")
        res.send({ data: response.data })
    }

    async searchTvShows(req, res) {
        const query = req.params.query
        const adaptedQuery = encodeURIComponent(query)

        var url = SEARCH_TV_SHOW.replace("{query}", adaptedQuery)
        req.log.info(`Calling TMDB API: ${url}`)

        const response = await axios.get(url, headers)

        req.log.info("TMDB API response is OK")
        res.send({ data: response.data })
    }

    async getMovieDetails(req, res) {
        const id = req.params.id

        var url = GET_MOVIE_DETAILS.replace("{id}", id)
        req.log.info(`Calling TMDB API: ${url}`)

        const response = await axios.get(url, headers)

        req.log.info("TMDB API response is OK")
        res.send({ data: response.data })
    }

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
