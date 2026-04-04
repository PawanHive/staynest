const Review = require("../models/review.js"); // 'Review' model required
const Listing = require("../models/listing.js"); // 'Listing' model required

// REVIEWS - post route (controller)
module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id); //  Find listing
  const newReview = new Review(req.body.review); //  Create review
  newReview.author = req.user._id; // Link review to logged-in user
  // console.log(newReview)
  listing.reviews.push(newReview); //  Link review to listing
  await newReview.save(); //  Save review
  await listing.save(); //  Save listing
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${id}`);
};

// REVIEWS - delete route (controller)
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // this line make sure: removes review ObjectId from 'reviews' array, means it should delete completely
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
