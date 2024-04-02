const axios = require("axios")

const THE_MOVIE_DB_API_URL = "https://api.themoviedb.org/3"
const THE_MOVIE_DB_API_KEY = process.env.THE_MOVIE_DB_API_KEY || ""

const SEARCH_MOVIE = `${THE_MOVIE_DB_API_URL}/search/movie?query={query}&language=it-IT&page=1`
const SEARCH_TV_SHOW = `${THE_MOVIE_DB_API_URL}/search/tv?query={query}&language=it-IT&page=1`

const headers = {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${THE_MOVIE_DB_API_KEY}`,
    },
}

class ProgramMetadataController {
    constructor() {}

    async searchMovies(req, res) {
        try {
            const query = req.params.query
            const adaptedQuery = encodeURIComponent(query)

            var url = SEARCH_MOVIE.replace("{query}", adaptedQuery)
            req.log.info(`Calling TMDB API: ${url}`)

            const response = await axios.get(url, headers)

            if (response.status == 200) {
                req.log.info("TMDB API response is OK")
                res.send({ data: response.data })
            }
        } catch (error) {
            req.log.error(`Error search movies: ${error.message}`)
            res.status(500).send({ error: { message: "Error search movies" } })
        }
    }

    async searchTvShows(req, res) {
        try {
            const query = req.params.query
            const adaptedQuery = encodeURIComponent(query)

            var url = SEARCH_TV_SHOW.replace("{query}", adaptedQuery)
            req.log.info(`Calling TMDB API: ${url}`)

            const response = await axios.get(url, headers)

            if (response.status == 200) {
                req.log.info("TMDB API response is OK")
                res.send({ data: response.data })
            }
        } catch (error) {
            req.log.error(`Error search tv shows: ${error.message}`)
            res.status(500).send({ error: { message: "Error search tv shows" } })
        }
    }
}

module.exports = ProgramMetadataController
