# React Course Explorer

A full-stack course marketplace web app where users can browse courses, bookmark favorites, add courses to a cart, and check out. Built as a learning project to practice React, React Router, Express, and full-stack deployment.

## Live Demo

- **Frontend (Vercel):(https://react-course-explorer-jx3o0e66q-ahmedsayedomar1.vercel.app/)
- **Backend API (Render):[** https://react-course-explorer-backend.onrender.com](https://react-course-explorer-backend.onrender.com)

> Note: the backend is hosted on Render's free tier, so it may take 30–50 seconds to "wake up" if it hasn't been used recently. If the app looks like it's not loading data at first, give it a moment and refresh.

## Features

- Browse and search available courses
- View detailed course information (instructor, hours, price, description)
- Bookmark courses for later
- Add courses to a cart and adjust/remove items
- Checkout flow with an order summary and payment breakdown
- Responsive header with active-page highlighting

## Tech Stack

**Frontend**
- React (with `react-router` for client-side routing)
- Vite (build tool and dev server)
- Axios (HTTP requests)

**Backend**
- Node.js + Express
- In-memory data store (courses, cart, bookmarks, orders — resets on server restart)
- CORS-enabled REST API

**Deployment**
- Frontend hosted on Vercel
- Backend hosted on Render

## Project Structure

```
react-course-explorer/
├── src/
│   ├── Pages/
│   │   ├── Courses/
│   │   │   └── CoursesPage.jsx
│   │   ├── BookMark/
│   │   │   └── BookMarkPage.jsx
│   │   ├── Details/
│   │   │   └── DetailsPage.jsx
│   │   └── Checkout/
│   │       ├── CheckoutPage.jsx
│   │       └── CartItems.jsx
│   ├── utils/
│   │   └── Money.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── images/            # static frontend assets (logo, icons, etc.)
├── vercel.json             # SPA rewrite rules for client-side routing
├── vite.config.js
└── package.json
```

## Frontend Routes

| Path            | Page          |
|-----------------|---------------|
| `/`             | Course listing |
| `/bookmarks`    | Bookmarked courses |
| `/courseDetails`| Course details modal/page |
| `/checkout`     | Cart review and checkout |

## Backend API Reference

Base URL: `VITE_API_URL` (e.g. `https://react-course-explorer-backend.onrender.com`)

### Courses

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses?search=&expand=isBookmarked,isPurchased` | List/search courses. `search` filters by name/keywords. `expand` adds `isBookmarked` and/or `isPurchased` flags to each course. |
| GET | `/api/courses/:courseId?expand=isBookmarked,isPurchased` | Get a single course by id. Returns `404` if not found. |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart-items?expand=course` | List cart items. `expand=course` nests full course details under `course` on each item. |
| POST | `/api/cart-items` | Add a course to the cart. Body: `{ courseId}`. Returns `404` if course doesn't exist, `400` 
| DELETE | `/api/cart-items/:courseId` | Remove an item from the cart. `:courseId` is the course's id (not a separate cart-item id). Returns `404` if not in cart, `204` on success. |

### Bookmarks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookmarks?expand=course` | List bookmarked courses. `expand=course` nests full course details under `course` on each bookmark. |
| POST | `/api/bookmarks` | Bookmark a course. Body: `{ courseId }`. Returns `404` if the course doesn't exist, `409 Conflict` if it's already bookmarked, `201` with the new bookmark `{ courseId, bookmarkedAtMs }` on success. |
| DELETE | `/api/bookmarks/:courseId` | Remove a bookmark. `:courseId` is the course's id. Returns `404` if it wasn't bookmarked, `204` on success. |

### Orders (Checkout)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/:orderId?expand=courses` | Get a single order by id. Returns `404` if not found. |
| POST | `/api/orders` | Checks out the current cart: creates an order, marks every course in the cart as purchased, empties the cart. Returns `400` if the cart is empty, `201` with the new order on success. |




> **Note on `:courseId` in cart/bookmark deletes:** both cart items and bookmarks are keyed by `courseId`, not a separate internal id — when deleting, pass the course's id, not an item-specific id.

## Getting Started (Local Development)

### Prerequisites
- Node.js installed
- The backend repo running (see [backend README](#) or run it locally on `http://localhost:3000`)

### Setup

1. Clone the repo:
   ```bash
   git clone <this-repo-url>
   cd react-course-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:
   ```
   VITE_API_URL=http://localhost:3000
   ```
   (Use your deployed backend URL instead if you're not running the backend locally, e.g. `https://react-course-explorer-backend.onrender.com`.)

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

## Environment Variables

| Variable        | Description                                  |
|-----------------|-----------------------------------------------|
| `VITE_API_URL`  | Base URL of the backend API (no trailing slash) |

This variable must also be set in your Vercel project settings (**Settings → Environment Variables**) for the deployed site to reach the backend.

## Deployment Notes

- The frontend is deployed on **Vercel**, which auto-builds from this repo using `npm run build` and serves the `dist/` folder.
- A `vercel.json` file with SPA rewrite rules is required so that direct navigation/refresh on routes like `/checkout` or `/bookmarks` doesn't 404:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
- The backend is deployed separately on **Render** as its own service/repo.
- CORS is enabled on the backend to allow requests from the deployed frontend origin.

## Known Limitations

- Backend data is stored in memory only — cart items, bookmarks, and orders reset whenever the backend restarts or redeploys.
- Render's free tier spins down after inactivity, causing a delay on the first request after idle periods.

## License

This project was built for educational purposes.
