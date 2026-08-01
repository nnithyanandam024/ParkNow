# 🚗 ParkNow

> **Smart Parking Management System** built with **React Native** and **Supabase**

ParkNow is a modern, cross-platform mobile application that simplifies parking management through real-time parking availability, online slot booking, QR-based vehicle verification, and dedicated dashboards for **Users**, **Staff**, and **Administrators**.

---

## ✨ Features

### 👤 User
- 🔍 Search nearby parking locations
- 🗺️ Interactive parking map
- 🅿️ Live parking slot availability
- 📅 Online parking reservation
- 💳 Secure payment flow
- 📱 QR-based digital parking pass
- 🧭 Navigation to parking location
- 📖 Booking history

### 👷 Staff
- 🚶 Walk-in customer booking
- 🅿️ Manual parking slot assignment
- 📷 QR Code verification
- ✅ Vehicle check-in
- 💰 Payment collection
- 📊 Live booking management

### 👨‍💼 Administrator
- 📈 Real-time dashboard
- 🅿️ Parking slot management
- 👥 Staff management
- 📊 Occupancy & booking statistics
- ⚙️ System monitoring

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Mobile Framework | React Native |
| Language | JavaScript / TypeScript |
| Backend | Supabase |
| Database | PostgreSQL |
| Authentication | Supabase Auth |
| Real-Time | Supabase Realtime |
| Maps | React Native Maps + Leaflet |
| QR Code | react-native-qrcode-svg, react-native-camera-kit |
| Local Storage | AsyncStorage |

---

# 📂 Project Structure

```
ParkNow/
│
├── App.tsx
├── index.js
├── package.json
│
├── src/
│   ├── config/
│   ├── services/
│   ├── Component/
│   │   ├── User/
│   │   ├── Staff/
│   │   ├── Admin/
│   │   └── Common/
│   └── theme.js
│
└── assets/
```

---

# 🚀 Getting Started

## Prerequisites

Before running the project, ensure you have installed:

- Node.js (v22 or later)
- React Native CLI
- Android Studio
- Android SDK
- Java JDK 17+
- Git
- CocoaPods (macOS only)

Follow the official React Native environment setup guide before proceeding.

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/ParkNow.git

cd ParkNow
```

Install project dependencies:

### Using npm

```bash
npm install
```

### Using Yarn

```bash
yarn install
```

---

# ▶️ Running the Application

## Step 1 – Start Metro

Metro is the JavaScript bundler used by React Native.

Using npm

```bash
npm start
```

Using Yarn

```bash
yarn start
```

---

## Step 2 – Run on Android

Using npm

```bash
npm run android
```

Using Yarn

```bash
yarn android
```

---

## Step 3 – Run on iOS

> **macOS only**

Install CocoaPods dependencies (first time only or after native dependency updates).

```bash
bundle install
```

Then run:

```bash
bundle exec pod install
```

Start the iOS application:

Using npm

```bash
npm run ios
```

Using Yarn

```bash
yarn ios
```

---

# 🔄 Fast Refresh

Open **App.tsx** in your editor and begin making changes.

React Native automatically reloads your application using **Fast Refresh** whenever you save the file.

### Manual Reload

**Android**

- Press **R** twice
- OR open Developer Menu (**Ctrl + M**)

**iOS**

- Press **R** inside the iOS Simulator

---

# 🔐 Authentication

ParkNow uses **Supabase Authentication** for secure login.

Supported Roles:

- 👤 User
- 👷 Staff
- 👨‍💼 Administrator

---

# ⚡ Real-Time Features

Powered by **Supabase Realtime**

- Live parking slot availability
- Instant booking updates
- Real-time occupancy monitoring
- Automatic dashboard refresh
- Live QR verification status

---

# 📱 Core Modules

### User Module

- Home
- Search
- Parking Details
- Slot Selection
- Booking
- Payment
- QR Pass
- Navigation
- My Bookings
- Profile

### Staff Module

- Dashboard
- Manual Booking
- Booking List
- QR Scanner
- Payment Collection
- Entry Verification

### Admin Module

- Dashboard
- Slot Management
- Staff Management
- Reports
- Profile

---

# 🏗️ Architecture

The application follows a **Service-Oriented Architecture (SOA)**.

```
React Native App

        │

        ▼

Services Layer

Authentication

Booking

Parking

Staff

Admin

Realtime

        │

        ▼

Supabase Backend

PostgreSQL

Authentication

Realtime

Storage
```

---

# 📦 Build Commands

### Install Dependencies

```bash
npm install
```

### Start Metro

```bash
npm start
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Reset Metro Cache

```bash
npx react-native start --reset-cache
```

---

# 🚀 Future Enhancements

- 🤖 AI Parking Prediction
- 🚘 Automatic Number Plate Recognition (ANPR)
- ⚡ EV Charging Support
- 💳 Razorpay / Stripe Integration
- 📍 Google Maps Live Navigation
- 📊 Advanced Analytics Dashboard
- 🌍 Multi-City Support
- 🛰️ IoT Smart Parking Sensors

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is developed for educational purposes and hackathon participation.

---

# 👥 Team

**Project:** ParkNow – Smart Parking Management System

Developed by the ParkNow Team.

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps support the project and motivates future development.

---

**Built with ❤️ using React Native & Supabase**
