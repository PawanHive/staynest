# MVC (Model View Controller)

## What is MVC?

**MVC = Model + View + Controller**

It’s a design pattern used to organize your code properly so your app stays clean and scalable.

---

## One-Line Definition

**MVC separates your app into data (Model), UI (View), and logic (Controller).**

**Responsibilities:**
- Receiving request
- Talking to Model
- Sending data to View

👉 Think: *“What happens when user clicks something?”*

---

## How MVC Works Together

1. User requests `/listings/123`
2. Controller handles request
3. Controller asks Model for data
4. Model returns listing data
5. Controller sends data to View
6. View renders HTML and shows user

---

## 1.1 Example:

`controllers/listings.js`
example of one route

```js
const Listing = require("../models/listing");

// Update Route - controller
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`); // redirect to (Show Route)
};

```

`routes/listings.js`

```js
const listingController = require("../controllers/listings.js");

// Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing),
);
```