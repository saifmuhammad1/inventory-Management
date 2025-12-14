# 📦 Inventory App

A **mobile inventory management app** built with **React Native**, **Tamagui**, **Expo Router**, and **Appwrite**.

This app helps you **manage products easily** – add, edit, delete, search, and store product images with a clean and responsive mobile UI.

---

## ✨ What This App Does

- 🔐 Login & Signup using Email and Password
- 🔄 Stay logged in even after closing the app
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 🖼️ Upload and show product images
- 🔍 Search products by name
- 📱 Mobile-friendly responsive UI
- 🔔 Toast messages for success and errors
- 🚀 Smooth navigation between screens

---

## 📱 App Screens

- **Login / Signup** – User authentication
- **Product List** – View and search products
- **Product Form** – Add or edit product details
- **Product Details** – View image, price, quantity, and category

---

## 🛠 Tech Stack (Simple)

### Frontend

- React Native
- Expo
- TypeScript
- Tamagui (UI components)
- Expo Router (navigation)

### Backend

- Appwrite

  - Database (product data)
  - Storage (product images)
  - Authentication

### Other Tools

- React Hook Form + Zod (form validation)
- Lucide Icons (icons)

---

## 📂 Product Data Structure

Each product contains:

| Field    | Type   | Required |
| -------- | ------ | -------- |
| name     | string | ✅       |
| price    | number | ✅       |
| quantity | number | ✅       |
| category | string | ✅       |
| imageId  | string | ❌       |

---

## 🚀 Getting Started

### 1️⃣ Clone the project

```bash
git clone https://github.com/saifmuhammad1/inventory-Management.git
cd inventory-app
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Start the app

```bash
npx expo start
```

Open the app using:

- Android / iOS Emulator
- **Expo Go** app on your phone

---

## ⚙️ Appwrite Setup (Required)

1. Create a project in **Appwrite Console**
2. Create a **Database** named:
   `inventory_db`
3. Create a **Collection** named:
   `products`
4. Add fields (shown above)
5. Enable **Email/Password Authentication**
6. Create a **Storage Bucket** for product images
7. Update your Appwrite **Project ID** and **Endpoint** in the app

---

## 📦 Running on Mobile

### Development

- Use **Expo Go** (Android / iOS)

### Production Build

```bash
eas build --platform android --profile production
```

Or generate APK from **Expo.dev dashboard**

---

## 🧑‍💻 How to Use the App

1. Open the app
2. Sign up or log in
3. Go to Product Management
4. Add a product (image, price, quantity, category)
5. Edit or delete products anytime
6. Use the search bar to find products

---

## 🔔 Toast Notifications

The app shows messages for actions like success or failure.

```ts
// Success message
showToast("Product Deleted", "success");

// Error message
showToast("Delete failed", "error");
```
