# Foodie Express 🍔

Foodie Express is a modern, full-stack multi-vendor marketplace designed for seamless delivery of food, groceries, electronics, and more. Built with a focus on premium UI/UX and advanced AI features, it provides users with a tailored discovery experience.

## 🚀 Features

### 🛒 Multi-Vendor Marketplace
- **Diverse Categories**: Explore vendors across Food, Grocery, Electronics, and Bakery.
- **Vendor Storefronts**: Detailed store pages with categorized menus, store info (address, hours), and ratings.
- **Favorites System**: Save your favorite products and vendors for quick access.

### 🤖 AI-Powered Smart Search
- **Gemini Search Grounding**: Integrates Google Search via Gemini 1.5 Flash to provide real-time insights, suggested categories, and refined keywords as you type.
- **Context-Aware Suggestions**: Get intelligent search recommendations based on user intent and category context.

### 📱 Premium Mobile Experience
- **Overhauled Navigation**: A sleek, full-screen mobile menu with integrated account management.
- **Responsive Design**: Desktop-first precision with mobile-first code, optimized for all devices.
- **Smooth Animations**: Powered by Framer Motion for a fluid, high-end feel.

### 📝 Customer Engagement
- **Review System**: Dedicated reviews tab on vendor pages where customers can share experiences and rate products.
- **Post-Order Feedback**: Users are prompted to review vendors directly from their order history or tracking page once delivered.

### 📦 Order Management
- **Real-Time Tracking**: Visual progress bar for orders (Confirmed -> Preparing -> On the way -> Delivered).
- **Order History**: Comprehensive log of past orders with re-order and review functionality.
- **Refined Checkout**: Secure and intuitive checkout flow with address management.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API (@google/genai)
- **State Management**: React Context (Auth, Cart)

## 🔑 Environment Variables

To enable the smart search grounding feature, you must provide a Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

## 🏗️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📄 License

MIT © Foodie Express
