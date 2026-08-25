# TASK TEST RESULTS

## Project
**Tech Store - React E-Commerce Frontend**

This file documents the manual testing results for the React e-commerce training task.

---

## Manual Test Results

| # | Test | Result | Notes |
|---|---|---|---|
| 1 | Open main routes and navigation links | PASS | Home, Products, Cart, Login, Profile, Admin and 404 routes were tested. |
| 2 | Refresh Product Details page | PASS | Product details are loaded from local mock data using the route ID. |
| 3 | Search for existing product | PASS | Product search works. |
| 4 | Search for non-existing product | PASS | No Results state is displayed. |
| 5 | Apply category, price and stock filters | PASS | Filters are implemented and results update correctly. |
| 6 | Clear all filters | PASS | Clear Filters resets the product filters. |
| 7 | Add product to cart | PASS | Product can be added from Product Details. |
| 8 | Keep cart after page refresh | PASS | Cart is stored using LocalStorage. |
| 9 | Prevent quantity above available stock | PASS | Quantity is limited to stock quantity. |
| 10 | Update cart quantity | PASS | Quantity can be changed from the Cart page. |
| 11 | Remove product from cart | PASS | Removal works with confirmation. |
| 12 | Checkout with incomplete data | PASS | Validation message is displayed. |
| 13 | Checkout with valid data | PASS | Mock order number is generated and cart is cleared. |
| 14 | Customer attempts to open /admin | PASS | Unauthorized access is prevented. |
| 15 | Admin opens /admin | PASS | Admin Dashboard loads correctly. |
| 16 | Add product from Admin Dashboard | PASS | New product is added to local State. |
| 17 | Edit product from Admin Dashboard | PASS | Product data can be edited. |
| 18 | Activate / Deactivate product | PASS | Status can be changed with confirmation before deactivation. |
| 19 | Add category | PASS | New category can be added locally. |
| 20 | Change order status | PASS | Order status can be changed from Admin Dashboard. |
| 21 | Mobile responsive layout | PASS | Mobile Navbar and responsive layout were tested. |
| 22 | Tablet layout at 768px | PENDING | Final manual visual check required. |
| 23 | Desktop layout at 1440px | PENDING | Final manual visual check required. |
| 24 | Keyboard navigation and visible focus | PENDING | Final accessibility check required. |
| 25 | 404 page | PASS | Unknown routes display the 404 page. |
| 26 | Production build | PASS | `npm run build` completed successfully. |

---

## UI States Tested

- Loading
- Empty Cart
- No Results
- Success
- Out of Stock
- Limited Stock
- Disabled Button
- Invalid Form
- Unauthorized
- 404 Not Found

---

## Demo Accounts

### Customer

```text
Email: customer@example.com
Password: customer123
```

### Admin

```text
Email: admin@example.com
Password: admin123
```

---

## Build Result

```bash
npm run build
```

Result:

```text
Build completed successfully.
```

---

## Final Pending Checks

Before final submission, perform these three quick checks:

1. Open the application at **1440px** width and verify the Desktop layout.
2. Open the application at **768px** width and verify the Tablet layout.
3. Navigate through buttons, links, and inputs using the **Tab** key and confirm that keyboard focus is visible.

After completing them, change their status from `PENDING` to `PASS`.
