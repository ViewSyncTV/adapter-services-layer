/**
 * @namespace Router.ProgramMetadata
 * @category API
 * @requires express
 */

const express = require("express")
const ProgramMetadataController = require("../controllers/program-metadata-controller")
const { asyncHandler } = require("../middleware/error-handler")

// eslint-disable-next-line no-unused-vars
const Router = require("./router")

const router = express.Router()
const programMetadataController = new ProgramMetadataController()

/**
 * Base route of the Metadata API
 * @name Base
 * @route {GET} /api/program-metadata
 * @memberof Router.ProgramMetadata
 */
router.get("/", (req, res) => {
    res.send("This is the program metadata API endpoint!")
})

/**
 * Search for movies given a query
 * @name MovieSearch
 * @route {GET} /api/program-metadata/movie/search/:query
 * @routeparam {string} :query - The query to search for
 * @memberof Router.ProgramMetadata
 */
router.get("/movie/search/:query", asyncHandler(programMetadataController.searchMovies))

/**
 * Search for tv-shows given a query
 * @name TvShowSearch
 * @route {GET} /api/program-metadata/tv-show/search/:query
 * @routeparam {string} :query - The query to search for
 * @memberof Router.ProgramMetadata
 */
router.get("/tv-show/search/:query", asyncHandler(programMetadataController.searchTvShows))

/**
 * Get the details of a movie given its id (the id is the one from the IMDB API)
 * @name MovieDetails
 * @route {GET} /api/program-metadata/movie/:id
 * @routeparam {string} :id - The id of the movie
 * @memberof Router.ProgramMetadata
 */
router.get("/movie/:id", asyncHandler(programMetadataController.getMovieDetails))

/**
 * Get the details of a tv-show given its id (the id is the one from the TMDB API)
 * @name TvShowDetails
 * @route {GET} /api/program-metadata/tv-show/:id
 * @routeparam {string} :id - The id of the tv-show
 * @memberof Router.ProgramMetadata
 */
router.get("/tv-show/:id", asyncHandler(programMetadataController.getTvShowDetails))

module.exports = router
