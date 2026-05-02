# AP23110010123
# Notification System Design

## Overview
This project is a frontend-based notification system that fetches and displays notifications from an external API. It provides sorting, filtering, and logging functionality with a clean user interface.

---

## Features
- Fetch notifications from API
- Priority-based sorting (Placement > Result > Event)
- Filter notifications by type
- Logging middleware integration
- Clean and responsive UI

---

## Architecture
- Frontend: Next.js (React)
- Backend Proxy: Next.js API routes
- External API: Notification service
- Logging API: Used via backend route to avoid CORS issues

---

## Data Flow
1. Frontend calls `/api/notifications`
2. Backend route adds Authorization token
3. External API returns notifications
4. Data sent back to frontend
5. Frontend displays sorted and filtered results

---

## Logging
Logging is implemented using a reusable function:
Log(stack, level, package, message)

- Logs API calls and user actions
- Sent through `/api/log` to avoid CORS issues

---

## Screenshots

### Home Page
![Home](./assets/screenshots/home.png)

### Filter Functionality
![Filter](./assets/screenshots/filter.png)

### Mobile View
![Mobile](./assets/screenshots/mobile.png)
