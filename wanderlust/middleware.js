// Defining middleware for `req.isAuthenticate()` means is user logged-in or not.

const isLoggedIn = (req, res, next) => {
  // console.log(req.path, "..", req.originalUrl);
  if (!req.isAuthenticated()) { // if 'user' is not logged-in
    req.session.redirectUrl = req.originalUrl; // save URL, User tries: /listings/new  ....(save url only if user is not logged-in, it will save last page URL on which /login page redirects )
    req.flash("error", "You must be logged-in"); // show flash message
    return res.redirect("/login"); // redirect to login page to do login
  }
  next(); // calling next() is compulsory.
};

module.exports = isLoggedIn;


// Middleware(login): This middleware takes the URL saved in session (before login) and makes it available after login so you can redirect the user back to the same page.
module.exports.saveRedirectUrl = (req, res, next) => {
  if(req.session.redirectUrl) {   // if req.session.redirectUrl exits
    res.locals.redirectUrl = req.session.redirectUrl; // then save to 'req.locals', ... 'redirectUrl' variable
  }
  next();
}
