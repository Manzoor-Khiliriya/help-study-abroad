# Help Study Abroad – Admin & Catalog Dashboard

A modern, responsive admin dashboard built with **Next.js (App Router)**, **Material UI (MUI)**, **Zustand**, and **NextAuth**.  
This project demonstrates real-world frontend practices such as authentication, server-side pagination, clean state management, and API integration using a public backend (DummyJSON).

---

## 🚀 Features

- **Authentication (NextAuth + Credentials)**
  - Secure login using DummyJSON credentials
  - Protected routes for dashboard pages
  - Session persistence across page refreshes

- **Product Catalog**
  - Server-side pagination using `limit` and `skip`
  - Search products via API (`/products/search`)
  - Category-based filtering
  - Product detail pages with images and metadata

- **User Management**
  - Paginated users list
  - Search users by name
  - User detail view with full profile data

- **State Management (Zustand)**
  - Centralized global state
  - Async actions inside stores
  - Clean separation between state and API services

- **Responsive UI**
  - Fully built with Material UI
  - Mobile-first layouts using MUI Grid
  - Accessible and consistent design

- **API Architecture**
  - Dedicated service layer (`services/`)
  - Clean separation of concerns
  - Easy to extend or replace backend

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** Material UI (MUI)
- **State Management:** Zustand
- **Authentication:** NextAuth (Credentials Provider)
- **API:** DummyJSON (Public REST API)
- **Language:** TypeScript

---

## 🧑‍💻 Installation & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/Manzoor-Khiliriya/help-study-abroad.git
   cd help-study-abroad

2. **Install dependencies:**
```
npm install
```

3. **Run the development server**
npm run dev

Open in browser
```
http://localhost:3000
```
## 🔐 Test Credentials

Use any valid DummyJSON user.

```
Username: emilys
Password: emilyspass
```

## 🧠 Technical Decisions
**Why Zustand?**

***Zustand was chosen over Redux or React Context because:***

- Minimal boilerplate (no reducers or actions)
- Lightweight and fast
- Built-in async support for API calls
- Subscription-based updates for better performance
- Ideal for small-to-medium dashboards

## 🚀 Caching Strategy

- Caching is implemented to improve UX and reduce unnecessary API calls.
- Category Caching
- Product categories are fetched once
- Stored in Zustand and reused across renders
- Detail-Level Reuse
- Product/User detail pages reuse existing list data when available
- Prevents empty UI flashes during navigation
- Authentication Persistence
- Authentication handled by NextAuth
- Prevents forced logout on page refresh

## 📁 Project Structure
```
src/
 ├─ app/              # Next.js App Router pages & layouts
 ├─ store/            # Zustand stores
 ├─ services/         # API service layer (DummyJSON)
 ├─ components/       # Reusable UI components
 └─ hooks/            # Custom hooks (e.g., debouncing)
```

## ✅ Completed Features

- Authentication & protected routes
- Users list with search & pagination
- Products list with search, filter & pagination
- Product & user detail pages
- Responsive UI using MUI
- Clean state & service separation

## 🏁 Conclusion

- This project demonstrates a production-ready frontend dashboard with clean architecture, predictable state management, scalable API integration, and strong UX fundamentals.
- Built as part of a frontend technical assessment using public APIs.
