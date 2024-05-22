/**
 * @namespace API.ProgramMetadata
 * @category API
 * @subcategory External Resources
 * @requires express
 */

const express = require("express")
const ProgramMetadataController = require("../controllers/program-metadata-controller")
const { asyncHandler } = require("../middleware/error-handler")

// eslint-disable-next-line no-unused-vars
const API = require("./router")

const router = express.Router()
const programMetadataController = new ProgramMetadataController()

/**
 * Base route of the Metadata API
 * @name Root
 * @route {GET} /api/program-metadata
 * @memberof API.ProgramMetadata
 */
router.get("/", (req, res) => {
    res.send("This is the program metadata API endpoint!")
})

/**
 * Search for movies given a query
 * @name MovieSearch
 * @route {GET} /api/program-metadata/movie/search/:query
 * @routeparam {string} :query - The query to search for
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/movie/search/joker
 *
 * // Example of response
 * {
 *   "data":
 *    {
 *      "page":1,
 *      "results":[
 *        // List of tv-shows
 *        // The response structure and fields are defined by the TMDB API.
 *        // Refer to the TMDB API documentation for detailed information.
 *      ],
 *      "total_pages":1,
 *      "total_results":2
 *    }
 * }
 * @see {@link https://developers.themoviedb.org/reference/search-movie|TMDB API Documentation}
 */
router.get("/movie/search/:query", asyncHandler(programMetadataController.searchMovies))

/**
 * Search for tv-shows given a query
 * @name TvShowSearch
 * @route {GET} /api/program-metadata/tv-show/search/:query
 * @routeparam {string} :query - The query to search for
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/tv-show/search/breaking+bad
 *
 * // Example of response
 * {
 *   "data":
 *    {
 *      "page":1,
 *      "results":[
 *        // List of tv-shows
 *        // The response structure and fields are defined by the TMDB API.
 *        // Refer to the TMDB API documentation for detailed information.
 *      ],
 *      "total_pages":1,
 *      "total_results":2
 *    }
 * }
 * @see {@link https://developers.themoviedb.org/reference/search-tv|TMDB API Documentation}
 */
router.get("/tv-show/search/:query", asyncHandler(programMetadataController.searchTvShows))

/**
 * Get the details of a movie given its id (the id is the one from the IMDB API)
 * @name MovieDetails
 * @route {GET} /api/program-metadata/movie/:id
 * @routeparam {string} :id - The id of the movie
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/movie/123
 *
 * // Example of response
 * {
 *   "data": {
 *     // The response structure and fields are defined by the TMDB API.
 *     // Refer to the TMDB API documentation for detailed information.
 *   }
 * }
 * @see {@link https://developer.themoviedb.org/reference/movie-details|TMDB API Documentation}
 */
router.get("/movie/:id", asyncHandler(programMetadataController.getMovieDetails))

/**
 * Get the details of a tv-show given its id (the id is the one from the TMDB API)
 * @name TvShowDetails
 * @route {GET} /api/program-metadata/tv-show/:id
 * @routeparam {string} :id - The id of the tv-show
 * @memberof API.ProgramMetadata
 * @example
 * // Example of request
 * GET /api/program-metadata/tv-show/123
 *
 * // Example of response
 * {
 *   "data": {
 *     // The response structure and fields are defined by the TMDB API.
 *     // Refer to the TMDB API documentation for detailed information.
 *   }
 * }
 * @see {@link https://developer.themoviedb.org/reference/tv-series-details|TMDB API Documentation}
 */
router.get("/tv-show/:id", asyncHandler(programMetadataController.getTvShowDetails))

module.exports = router
