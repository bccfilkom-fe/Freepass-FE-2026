# Platzi Fake Store App

A Flutter E-commerce application built with Clean Architecture and GetX.

## Features

- **Clean Architecture**: Separation of concerns into Domain, Data, and Presentation layers.
- **State Management**: GetX for reactive state management, dependency injection, and routing.
- **Network**: Dio for efficient API requests.
- **Local Storage**: Hive for offline data persistence (User session, Products cache).
- **Responsive Design**: Adapts to various screen sizes using `flutter_screenutil`.
- **UI/UX**: Modern interface with animations (Hero, Staggered List) and Theme Switching (Light/Dark).

## Tech Stack

- Flutter & Dart
- GetX
- Dio
- Hive
- CachedNetworkImage
- Flutter ScreenUtil

## Setup

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    flutter pub get
    ```
3.  **Run the app**:
    ```bash
    flutter run
    ```

## Folder Structure

- `lib/app`: Application configuration (Bindings, Routes, Theme, Constants).
- `lib/data`: Data layer implementation (Models, API Services, Local Storage, Repositories).
- `lib/domain`: Business logic definitions (Entities, Repository Interfaces).
- `lib/presentation`: UI layer (Pages, Controllers, Widgets).

## API

Uses the [Platzi Fake Store API](https://api.escuelajs.co).
- Base URL: `https://api.escuelajs.co`
- Endpoints: Products, Categories, Users, Auth.
