// '/listings' is common in all routes.

const express = require("express");
const router = express.Router(); //router object
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");

// Index Route
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create Route
router.post(
  "/",
  validateListing, // middleware to check validation for schema
  wrapAsync(listingController.createListing),
);

// Show Route
router.get("/:id", wrapAsync(listingController.showListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

// Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);

// Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing),
);

module.exports = router;

/*
Note:
Here, common path was "/listings", so we remove that part
and added in app.js (express Router middleware) like: app.use("/listings", listingsRoute)
*/
