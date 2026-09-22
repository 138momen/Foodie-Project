#  Foodie - E-Commerce Web Application

A dynamic, fully responsive web application for online food ordering. Built using modern vanilla JavaScript, Bootstrap 5, and standard web technologies, **Foodie** simulates a full-stack e-commerce experience by decoupling frontend presentation from data management using a cloud-hosted JSON API and browser Local Storage.

---

##  Features

- **Dynamic Menu & Category Filtering:** Fetches product lists asynchronously from a GitHub Gist API and supports direct category navigation via URL query parameters (`URLSearchParams`).
- **Cart & State Management:** Real-time shopping cart calculation, persistent item storage, and checkout data processing using browser `localStorage`.
- **Order Management Dashboard:** Displays active and historical orders, calculates total prices, tracks live order status badges (*Processing*, *Cancelled*), and allows user cancellations.
- **Interactive Order Details Modal:** Integrated Bootstrap JavaScript Modal (`bootstrap.Modal`) dynamically populates full customer details, delivery address, and itemized product lists.
- **Data Sanitization & Validation:** Ensures robust user input handling across checkout forms using methods like `.trim()` to prevent fake or malformed order submissions.

---

##  Tech Stack

- **Frontend:** HTML5, CSS3 (Bootstrap 5, Poppins Font)
- **JavaScript:** Vanilla JavaScript (ES6+), `async/await`, `fetch` API, DOM Manipulation
- **State & Data Storage:** Browser `localStorage` / `sessionStorage`
- **Mock Backend API:** Custom JSON database hosted via GitHub Gists

---

##  Architecture & Data Flow

1. **Product Retrieval:** `menu.js` uses `fetch()` with `async/await` to pull menu items from a remote GitHub Gist.
2. **URL Parameters:** Query parameters in the navigation/footer links (e.g., `Menu.html?category=Pizza`) automatically trigger category filters on page load.
3. **Checkout Payload:** Upon submitting a checkout form, order payloads (Order ID, timestamp, items, customer info, status) are serialized into JSON strings and pushed to the `"myOrders"` Local Storage key.
4. **DOM Rendering:** `orders.js` parses the stored array to render order cards and inject detailed order data into Bootstrap modals on demand.

---

##  Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/138momen/Foodie-Project.git](https://github.com/138momen/Foodie-Project.git)
