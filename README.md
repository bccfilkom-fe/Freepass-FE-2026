# 🛒 Platzi Fake Store App

A modern **Flutter E-commerce application** built using **Clean Architecture** principles and **GetX** for scalable state management.

This project consumes the **Platzi Fake Store API** and demonstrates best practices in Flutter app structure, API handling, authentication, and UI responsiveness.

---

## ✨ Features

- **Clean Architecture**
  - Clear separation between **Domain**, **Data**, and **Presentation** layers
  - Easier to maintain, test, and scale

- **State Management & Dependency Injection**
  - Powered by **GetX**
  - Reactive state (`Obx`)
  - Route management & dependency bindings

- **Authentication**
  - Admin login using Platzi Fake Store API
  - Token-based authentication for protected endpoints (Create / Update / Delete Product)

- **Network**
  - **Dio** for REST API communication
  - Centralized API configuration & error handling

- **Local Storage**
  - **Hive** for:
    - User session persistence
    - Cached product data (offline-friendly)

- **Responsive UI**
  - Adaptive layouts using **flutter_screenutil**
  - Works well on different screen sizes

- **UI / UX**
  - Modern Material UI
  - Light & Dark theme support
  - Smooth animations (Hero, staggered lists)

---

## 🧰 Tech Stack

- **Flutter & Dart**
- **GetX**
- **Dio**
- **Hive**
- **CachedNetworkImage**
- **Flutter ScreenUtil**

---

## 🔐 Admin Login Credentials

⚠️ **Important**

Only **admin users** are allowed to create and update products.

Use the following credentials to log in as admin:

```json
{
  "email": "john@mail.com",
  "password": "changeme"
}
