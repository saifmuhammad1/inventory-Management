Inventory App

A mobile inventory management application built with React Native, Tamagui, Expo Router, and Appwrite backend.
Easily add, edit, delete, and search products in a simple, responsive UI.

Features

Email/Password Authentication using Appwrite

Persistent Login across app sessions

Add, Edit, Delete Products

Upload and display product images

Search products by name

Responsive UI with Tamagui

Toast notifications for success/error feedback

Smooth navigation with Expo Router

Screens

Login / Signup

Product List – searchable list of products

Product Form – Add/Edit product

Product Details – view image, price, quantity, and category

Tech Stack

Frontend: React Native, Tamagui, Expo, TypeScript

Backend: Appwrite (Database & Storage)

Icons: @tamagui/lucide-icons

State Management: React Hooks, React Hook Form, Zod for validation

Storage: Appwrite Storage, optional AsyncStorage for small local data

Installation

Clone the repository:

git clone https://github.com/yourusername/inventory-app.git
cd inventory-app

Install dependencies:

npm install

# or

yarn install

Start the Expo project:

npx expo start

Open in Android/iOS simulator or Expo Go app

Appwrite Setup

Create a project in Appwrite Console

Create Database: inventory_db

Create Collection: products with the following fields:

Field Type Required
name string yes
price float yes
quantity integer yes
category string yes
imageId string no

Enable Authentication (Email/Password)

Create Storage Bucket for product images

Update Appwrite project ID and endpoint in your app

Running on Mobile

Use Expo Go app for development (Android/iOS)

For production builds:

eas build --platform android --profile production

Or build APK directly via Expo.dev website

Usage

Open the app

Sign up / Login

Navigate to Product Management

Add a new product with image, price, quantity, and category

Edit or delete products

Search products using the search bar

Toast Notifications

Provides success/error feedback using a custom Toast component

// Show success toast
showToast("Product Deleted", "success");

// Show error toast
showToast("Delete failed", "error");
