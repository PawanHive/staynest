const express = require("express");
const router = express.Router({ mergeParams: true }); // Allows this router to access URL parameters (req.params) from its parent route (e.g., :id from app.use("/listings/:id/reviews", ...))
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js"); // 'Review' model required
const Listing = require("../models/listing.js"); // 'Listing' model required
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// REVIEWS - post route
router.post(
  "/",
  validateReview,
  isLoggedIn,
  wrapAsync(reviewController.createReview),
);

// REVIEWS - delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;

/*
Note:
Here, common path was "/listings/:id/reviews", so we remove that part
and added in app.js (express Router middleware) like: app.use("/listings/:id/reviews", reviewsRoute);;
*/
