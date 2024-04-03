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
        try {
            const query = req.params.query
            const adaptedQuery = encodeURIComponent(query)

            var url = SEARCH_MOVIE.replace("{query}", adaptedQuery)
            req.log.info(`Calling TMDB API: ${url}`)

            const response = await axios.get(url, headers)

            if (response.status == 200) {
                req.log.info("TMDB API response is OK")
                res.send({ data: response.data })
            } else {
                throw new Error("Error calling TMDB API")
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
            } else {
                throw new Error("Error calling TMDB API")
            }
        } catch (error) {
            req.log.error(`Error search tv shows: ${error.message}`)
            res.status(500).send({ error: { message: "Error search tv shows" } })
        }
    }

    async getMovieDetails(req, res) {
        try {
            const id = req.params.id

            var url = GET_MOVIE_DETAILS.replace("{id}", id)
            req.log.info(`Calling TMDB API: ${url}`)

            const response = await axios.get(url, headers)

            if (response.status == 200) {
                req.log.info("TMDB API response is OK")
                res.send({ data: response.data })
            } else {
                throw new Error("Error calling TMDB API")
            }
        } catch (error) {
            req.log.error(`Error getting movie details: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting movie details" } })
        }
    }

    async getTvShowDetails(req, res) {
        try {
            const id = req.params.id

            var url = GET_TV_SHOW_DETAILS.replace("{id}", id)
            req.log.info(`Calling TMDB API: ${url}`)

            const response = await axios.get(url, headers)

            if (response.status == 200) {
                req.log.info("TMDB API response is OK")
                res.send({ data: response.data })
            } else {
                throw new Error("Error calling TMDB API")
            }
        } catch (error) {
            req.log.error(`Error getting tv show details: ${error.message}`)
            res.status(500).send({ error: { message: "Error getting tv show details" } })
        }
    }
}

module.exports = ProgramMetadataController
