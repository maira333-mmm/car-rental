<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=210&color=0:1E3A5F,50:2563EB,100:60A5FA&text=AI%20Car%20Rental&fontColor=ffffff&fontSize=50&fontAlignY=38&desc=AI-Powered%20%7C%20Gemini%20Integration%20%7C%20React&descAlignY=60&animation=fadeIn" alt="AI Car Rental Header" />

<br>

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=20&duration=2800&pause=700&color=2563EB&center=true&vCenter=true&repeat=true&width=700&height=52&lines=AI-Powered+Car+Rental+System.;Google+Gemini+AI+Integration+for+Recommendations.;Smart+Price+Calculator+%7C+Booking+Management.;React+%7C+TypeScript+%7C+Framer+Motion." alt="Typing Animation" />
<br><br>

A modern **AI-Powered Car Rental System** built with **React, TypeScript, and Google Gemini AI**. Features intelligent car recommendations, dynamic price calculation with discounts, and a seamless booking experience.

<br>

<a href="https://github.com/maira333-mmm/car-rental">
  <img src="https://img.shields.io/badge/📂_SOURCE_CODE-181717?style=for-the-badge&logo=github&logoColor=white" alt="Source Code"/>
</a>

<a href="https://car-rental-jh7y.vercel.app">
  <img src="https://img.shields.io/badge/🌐_LIVE_DEMO-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/>
</a>

<a href="https://github.com/maira333-mmm/car-rental/commits/main">
  <img src="https://img.shields.io/github/last-commit/maira333-mmm/car-rental?style=for-the-badge&label=LAST%20UPDATE" alt="Last Update"/>
</a>

<br><br>

<img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white"/>
<img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=flat-square&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white"/>

</div>

---

# 📋 Table of Contents

- 📖 About
- ✨ Features
- 🤖 AI Integration
- 📁 Project Structure
- 🚀 Getting Started
- 🔧 Installation
- 💻 Usage Guide
- 📊 Price Calculator
- 🎨 UI/UX Design
- 📱 Pages Overview
- 🛠 Technologies Used
- 🌍 Browser Compatibility
- 🤝 Contributing
- 📬 Contact
- 📄 License
- 🙏 Acknowledgements

---

# 📖 About

The **AI-Powered Car Rental System** is a modern web application that combines the power of **Google Gemini AI** with a seamless car rental experience. Built with **React and TypeScript**, it offers intelligent car recommendations, dynamic pricing with discounts, and a complete booking management system.

## 🎯 Key Highlights

- 🤖 **AI-Powered Recommendations** - Google Gemini integration
- 💰 **Smart Price Calculator** - Dynamic discounts for weekly/monthly rentals
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Glassmorphism with smooth animations
- 📊 **Booking Management** - Complete booking flow with confirmation
- 🔒 **Secure Authentication** - User registration and login
- 🚀 **Vercel Deployment** - Live demo available

---

# ✨ Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Recommendations** | Google Gemini powered car suggestions |
| 💰 **Price Calculator** | Dynamic pricing with weekly/monthly discounts |
| 🎯 **Category Filtering** | Filter by Luxury, Economy, SUV, Van |
| 📅 **Booking System** | Complete booking with date selection |
| 📄 **PDF Confirmation** | Download booking confirmation |
| 🎨 **Glassmorphism UI** | Modern design with blur effects |
| ✨ **Smooth Animations** | Framer Motion animations |
| 🔐 **User Authentication** | Sign in / Sign up functionality |
| 📱 **Responsive Design** | Mobile-first approach |
| 🚀 **Vercel Deployed** | Live demo available |

---

# 🤖 AI Integration

## Google Gemini AI

The system uses **Google's Gemini AI** to provide intelligent car recommendations based on user preferences.

### How It Works

```typescript
// AI Recommendation Component
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Generate recommendations based on user input
const getRecommendations = async (preferences: string) => {
  const prompt = `Based on these preferences: ${preferences}, 
                  recommend the best car from our fleet...`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

## 🚀 Project Overview

> **🚗 Fully Functional Car Rental System**  
> Browse, filter and book rental cars with a modern responsive interface.  
> Built using **React, TypeScript, Vite, Google Gemini AI, Tailwind CSS & Vercel**.

---

# 📁 Project Structure

```text
car-rental/
│
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vercel.json
├── build.sh
├── build.js
├── .env
│
├── public/
│   ├── c-logo.png
│   └── pic/
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   │
│   ├── components/
│   │   ├── AIRecommendation.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── CarDetail.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   └── Success.tsx
│   │
│   └── styles/
│       └── c.css
│
└── dist/
```

---

# 🏗️ Project Architecture

```text
                         User
                          │
                          ▼
                React + TypeScript UI
                          │
            React Router Navigation
                          │
                          ▼
        Components & Pages (Reusable UI)
                          │
        ┌─────────────────┼──────────────────┐
        ▼                 ▼                  ▼
  Booking Module     AI Recommendation    Authentication
        │                 │                  │
        ▼                 ▼                  ▼
 Price Calculator    Google Gemini API   Local Storage
        │
        ▼
 PDF Booking Confirmation
```

---

# 🔄 Application Workflow

```text
Home
 │
 ▼
Browse Cars
 │
 ▼
Filter Category
 │
 ▼
View Details
 │
 ▼
AI Recommendation (Optional)
 │
 ▼
Book Vehicle
 │
 ▼
Calculate Price
 │
 ▼
Download PDF
 │
 ▼
Booking Successful
```

---

# 🚀 Getting Started

## 📋 Requirements

- 🟦 Node.js 18+
- 📦 npm or yarn
- 🤖 Google Gemini API Key
- 🌐 Modern Web Browser

---

## 🔧 Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/maira333-mmm/car-rental.git

cd car-rental
```

### 2️⃣ Install Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the project root.

```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

Get your API Key:

- Visit Google AI Studio
- Create an API Key
- Copy it into `.env`

---

### 4️⃣ Start Development Server

```bash
npm run dev
```

or

```bash
yarn dev
```

Open:

```
http://localhost:3000
```

---

### 5️⃣ Production Build

```bash
npm run build
```

or

```bash
yarn build
```

---

# 💻 Usage Guide

## 🚗 Browse Cars

- View all available cars
- Filter by category
- View specifications
- Compare pricing

---

## 🤖 AI Recommendation

- Open AI Assistant
- Enter budget
- Enter preferred fuel type
- Enter passenger capacity
- Receive personalized recommendations

---

## 📅 Book a Vehicle

1. Select a vehicle
2. Click **Book Now**
3. Enter customer details
4. Choose rental dates
5. Select insurance
6. Confirm booking

---

## 📄 Download Booking Receipt

After booking,

Click

**Download PDF**

to save your booking confirmation.

---

# 💰 Pricing System

| Duration | Discount |
|-----------|----------|
| 1–6 Days | None |
| 7–29 Days | 10% |
| 30+ Days | 20% |

### Insurance

| Plan | Cost |
|------|------|
| Basic | Included |
| Premium | +$15/day |

### Extra Discounts

- 🎓 Student → 15%
- 👴 Senior → 10%

---

# 🎨 UI / UX Design

## 🎨 Color Palette

| Color | Hex |
|---------|---------|
| Primary | #DD0707 |
| Dark Red | #BB0505 |
| Black | #000000 |
| White | #FFFFFF |
| Glass Effect | rgba(255,255,255,.05) |

---

## ✨ Design Features

- ✅ Responsive Layout
- ✅ Glassmorphism Cards
- ✅ Framer Motion Animations
- ✅ Hover Effects
- ✅ Gradient Backgrounds
- ✅ Mobile Friendly

---

# 📱 Pages

| Page | Description |
|-------|-------------|
| Home | Landing page with booking form |
| Services | Browse cars |
| Car Detail | Vehicle information |
| About | Company information |
| Contact | Contact form |
| Sign In | User login |
| Sign Up | Registration |
| Success | Booking confirmation |

---

# 🛠 Technologies Used

| Technology | Purpose |
|------------|----------|
| React 18 | Frontend Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router | Routing |
| Google Gemini AI | Recommendations |
| Framer Motion | Animations |
| Vercel | Deployment |

---

# 🌍 Browser Support

| Browser | Supported |
|----------|-----------|
| Chrome | ✅ |
| Firefox | ✅ |
| Edge | ✅ |
| Safari | ✅ |
| Opera | ✅ |
| Mobile Browsers | ✅ |

---

# 🤝 Contributing

```text
Fork Repository
      │
      ▼
Create Branch
      │
      ▼
Commit Changes
      │
      ▼
Push Branch
      │
      ▼
Open Pull Request
```

---


# 📬 Contact


<div align="center">

## 👩‍💻 Maira Alam

<a href="https://mail.google.com/mail/?view=cm&fs=1&to=maira.alam33@gmail.com">
  <img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/>
</a>

<a href="https://github.com/maira333-mmm">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/>
</a>

<a href="https://www.linkedin.com/in/maira-a-48699630b/">
<img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/>
</a>

<a href="https://maira-alam-o2p20gi.gamma.site/">
<img src="https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white"/>
</a>

</div>


---

# 📄 License

Licensed under the **MIT License**.

---

# 🚀 Future Enhancements

| Feature | Description |
|----------|-------------|
| 💳 Payment Gateway | Stripe & PayPal |
| 📱 React Native App | Android & iOS |
| 📧 Email Notifications | Booking Emails |
| 📊 Admin Dashboard | Manage Cars & Users |
| 🗺 Google Maps | Nearby Locations |
| ⭐ Reviews | User Ratings |
| 🌍 Multi-language | Internationalization |

---

# 🐛 Troubleshooting

<details>

<summary><b>❌ Gemini API Not Working</b></summary>

- Verify `.env` file
- Restart development server
- Check API Key validity
- Ensure billing/API access is enabled

</details>

<details>

<summary><b>❌ Build Failed</b></summary>

```bash
rm -rf node_modules package-lock.json

npm install

npm run build
```

</details>

<details>

<summary><b>❌ Images Not Showing</b></summary>

- Ensure images exist in `/public/pic`
- Verify image filenames
- Use absolute paths

</details>

---

# 🙏 Acknowledgements

| Resource | Purpose |
|----------|----------|
| React | Frontend Framework |
| Google Gemini | AI Recommendations |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Vercel | Deployment |
| GitHub | Repository Hosting |

---

<div align="center">

## ❤️ Built with React, TypeScript & Google Gemini AI

Made with 💙 by **Maira Alam**

⭐ **If you found this project helpful, consider giving it a Star!**
## 🚀 Live Demo

<a href="https://car-rental-jh7y.vercel.app">
  <img src="https://img.shields.io/badge/🌐_LIVE_DEMO-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/>
</a>













