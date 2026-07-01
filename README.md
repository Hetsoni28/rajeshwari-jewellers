<div align="center">
  <h1 align="center">Rajeshwari Jewellers | B2B Wholesale Platform</h1>
  <p align="center">
    <strong>A high-performance, headless e-commerce architecture tailored for luxury wholesale.</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Sanity.io-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="Sanity" />
  </p>
</div>

<hr />

## 📖 Overview

**Rajeshwari Jewellers** is a premium, high-performance B2B wholesale platform designed to bridge the gap between traditional jewelry manufacturing and modern digital commerce. Built on a cutting-edge **Headless Architecture**, the platform delivers lightning-fast page loads, exceptional SEO, and a luxury user experience, while empowering business owners with absolute control over their catalog via **Sanity CMS**.

This project showcases advanced capabilities in Next.js 14 (App Router), server-side rendering (SSR), incremental static regeneration (ISR), and complex client-side state management.

---

## ✨ Key Features

- ⚡ **Ultra-Fast Performance**: Achieves near-perfect Core Web Vitals (LCP, CLS) using Next.js advanced image optimization and static generation.
- 🛍️ **Headless CMS Integration**: Seamlessly integrated with Sanity.io. Admins can update categories, weights, and high-resolution images instantly without touching the codebase.
- 📄 **Automated PDF Catalog Generator**: A highly complex client-side engine that dynamically compiles real-time product data into structured, multi-page, print-ready PDF catalogs, grouped automatically by category.
- 📱 **Smart B2B Wishlist & Inquiry System**: Utilizes LocalStorage for persistent state and the native Web Share API to auto-generate highly formatted, category-wise WhatsApp inquiries for wholesale orders.
- 🎨 **Luxury UI/UX**: Custom-designed using Tailwind CSS and Framer Motion. Features include micro-animations, glassmorphism, responsive grid masonry, and an intelligent "Related Products" algorithm.

---

## 🛠️ Tech Stack

### **Frontend Architecture**
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### **Backend / Data Layer**
- **CMS**: [Sanity.io](https://www.sanity.io/) (Headless Content Management System)
- **Query Language**: [GROQ](https://www.sanity.io/docs/groq)
- **PDF Generation**: `jspdf` & `html2canvas`

---

## 🚀 Getting Started

Follow these instructions to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/YourUsername/rajeshwari-jewellers.git
cd rajeshwari-jewellers
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add your Sanity credentials:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.

---

## 📂 Project Structure

```text
├── src/
│   ├── app/                # Next.js 14 App Router pages & layouts
│   ├── components/         # Atomic Design Structure (Atoms, Molecules, Organisms, Templates)
│   ├── context/            # React Context Providers (e.g., WishlistContext)
│   ├── lib/                # Utility functions, PDF generators, Animation variants
│   ├── sanity/             # CMS Schemas, Config, and GROQ Queries
│   └── data/               # Static fallbacks and TypeScript interfaces
├── public/                 # Static assets, fonts, and images
└── tailwind.config.ts      # Custom Tailwind theme and brand colors
```

---

## 💡 Developer Notes

This project was architected with scalability and maintainability in mind. The **Atomic Design Methodology** is strictly enforced within the `components/` directory, ensuring reusability across the application. The integration of Sanity CMS ensures that the client is never bottlenecked by developer availability for catalog updates.

---

<div align="center">
  <i>Developed with ❤️ for the modern wholesale industry.</i>
</div>
