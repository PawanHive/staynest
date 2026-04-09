const User = require("../models/user.js");

// signUp GET route (controller)
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// SignUp POST route (controller)
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password); // stored user info into data base.
    // console.log(registeredUser);
    req.login(registeredUser, (err) => {
      // 'req.login()' make user login automatically just after signup(register).
      if (err) {
        return next(err); // rare (err), handle using express error handler.
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

// Login GET route (controller)
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// Login POST route (controller)
module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings"; // redirect to saved URL if exists, otherwise default to /listings
  delete req.session.redirectUrl; // clearn after use
  res.redirect(redirectUrl);
};

// Logout GET route (controller)
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // if passport is failed a middleware then only we get this error. other we usually don't get error during logout.
    }
    req.flash("success", "You are logged out!");
    res.redirect("/listings");
  });
};

module.exports.renderFavorites = async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");
  const AllListings = user.favorites;
  const count = AllListings.length;
  const favoriteIds = new Set(AllListings.map((listing) => listing._id.toString()));

  res.render("users/favorites.ejs", {
    AllListings,
    count,
    currentPath: req.originalUrl,
    favoriteIds,
  });
};
