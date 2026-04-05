# #Important Note:
**express Router (mergeParams):**[https://expressjs.com/en/5x/api.html#express.router](https://expressjs.com/en/5x/api.html#express.router)

# #1: Express Router - `mergeParams` (IMPORTANT CONCEPT)

## 1. What is `mergeParams`?

`mergeParams` is an option used with Express Router:

> It allows a child router to access route parameters from its parent router

---

## 2. Why Do We Need It?

When using nested routes like:

~~~text
/listings/:id/reviews
~~~

- `:id` belongs to the **parent route**
- But `reviews` router is a **child router**

👉 By default:
- Child router CANNOT access `:id` ❌

---

## 3. Problem Without `mergeParams`

### app.js

~~~js
app.use("/listings/:id/reviews", reviewRoutes);
~~~

---

### reviews.js

~~~js
router.post("/", (req, res) => {
  console.log(req.params.id); // ❌ undefined
});
~~~

---

## 4. Solution → Use `mergeParams`

~~~js
const router = express.Router({ mergeParams: true });
~~~

---

## 5. Now It Works ✅

~~~js
router.post("/", (req, res) => {
  console.log(req.params.id); // ✅ correct id
});
~~~

---

## 6. How It Works (Concept)

~~~text
Parent Route:     /listings/:id
                     ↓
Child Router:     /reviews
                     ↓
Final Route:      /listings/:id/reviews
                     ↓
mergeParams merges params into child router
~~~

---

## 7. Real Example

### app.js

~~~js
app.use("/listings/:id/reviews", reviewRoutes);
~~~

---

### reviews.js

~~~js
const router = express.Router({ mergeParams: true });

router.post("/", (req, res) => {
  const listingId = req.params.id;
  res.send(`Listing ID: ${listingId}`);
});
~~~

---

## 8. When to Use `mergeParams`?

Use it when:

- You have **nested routes**
- Child router needs access to **parent params**

---

## 9. When NOT Needed?

- If routes are NOT nested
- If you don’t need parent params

---

## 10. Key Point ⭐

> Without `mergeParams` → params are NOT shared  
> With `mergeParams` → params are shared

---

## Summary

- `mergeParams: true` allows child router to access parent params
- Essential for nested routing
- Common in REST APIs like:
  - `/posts/:id/comments`
  - `/users/:id/orders`