# 🛒 বাজার দর (BazarDor) — নিত্যপণ্যের বাজারদর ট্র্যাকার

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12-5A0EF8?style=for-the-badge)](https://daisyui.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-1.2-blue?style=for-the-badge)](https://better-auth.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 📌 প্রকল্পের বিবরণ (Project Description)

**বাজার দর (BazarDor)** হলো একটি আধুনিক, দ্রুতগতির এবং মোবাইল-রেসপন্সিভ ওয়েব অ্যাপ্লিকেশন যা বাংলাদেশের বিভিন্ন বাজারের নিত্যপ্রয়োজনীয় পণ্যসমূহের (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা) দৈনিক দামের হালনাগাদ তথ্য প্রদান করে। এর মাধ্যমে সাধারণ ক্রেতারা কোন পণ্যের দাম কত বাড়ল বা কমল তা এক নজরে পর্যবেক্ষণ করতে পারেন এবং বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম তুলনা করে কেনাকাটার সঠিক সিদ্ধান্ত নিতে পারেন।

- **লাইভ ডেমো লিংক (Live Link):** [https://bazardor-json.vercel.app/](https://baazardoor.vercel.app/)
- **গিটহাব রিপোজিটরি লিংক (GitHub Repository):** [https://github.com/foysalhridoy/BazarDor](https://github.com/foysalhridoy/BazarDor)

---

## ✨ প্রধান ৫টি বৈশিষ্ট্য (5 Key Features)

1. **📊 রিয়েল-টাইম প্রাইস টিকার ও মার্কেট ট্রেন্ডস (Live Price Ticker & Market Trends):**
   - ওয়েবসাইটের শীর্ষে ইনফিনিট স্ক্রলিং টিকার (marquee) যা স্বয়ংক্রিয়ভাবে আজকের বাজারদর ও পরিবর্তনের হার (▲/▼ %) প্রদর্শন করে।
   - মাউস হভার বা ফোকাস করলে টিকার নিজে থেকেই থেমে যায়।
   - আজকের বাজারে সবচেয়ে বেশি দাম বৃদ্ধি পাওয়া (Top 6 Risers) এবং দাম হ্রাস পাওয়া (Top 6 Fallers) পণ্যের জন্য আলাদা সেকশন।

2. **🔍 ক্যাটাগরিভিত্তিক অনুসন্ধান ও বাংলা সংখ্যায় সর্টিং (Category Filtering & Bangla Numeric Sort):**
   - চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ এবং মসলা সহ ৮টি প্রধান ক্যাটাগরিতে পণ্য ফিল্টার করার সুবিধা।
   - বাংলা সংখ্যাকে স্ট্রিং হিসেবে নয়, বরং প্রকৃত সংখ্যাগত মানে (numeric value) কম থেকে বেশি এবং বেশি থেকে কম অনুযায়ী নির্ভুল সর্টিং।

3. **🔐 প্রটেক্টেড প্রোডাক্ট ডিটেইলস ও বাজারভিত্তিক তুলনামূলক বিশ্লেষণ (Protected Product Details & Market Breakdown):**
   - পণ্যের বিস্তারিত তথ্য দেখতে ব্যবহারকারীকে অবশ্যই সাইন ইন করতে হবে; সাইন ইন না থাকলে স্বয়ংক্রিয়ভাবে রিডাইরেক্ট ও টোস্ট অ্যালার্ট দেখানো হয়।
   - পণ্যের সর্বনিম্ন দাম, সর্বাধিক দাম এবং সামগ্রিক গড় দামের কার্ড।
   - বিভিন্ন বাজারের (কারওয়ান বাজার, গ্রীন মার্কেট, সদর বাজার, ইত্যাদি) বিভাগভিত্তিক দামের বিস্তারিত তালিকা।

4. **👤 বেটারঅথ ও তথ্য হালনাগাদ সুবিধা (BetterAuth & Profile Update Feature - C3):**
   - ইমেইল/পাসওয়ার্ড ও সোশ্যাল লগইনের জন্য **BetterAuth** এর নিরবচ্ছিন্ন ইন্টিগ্রেশন।
   - ইউজার প্রোফাইল পেজে (`/profile`) হালনাগাদ বোতামে ক্লিক করে নতুন রাউটে গিয়ে (`/profile/update`) নাম পরিবর্তনের ফর্ম ও তাৎক্ষণিক আপডেট সুবিধা।
   - লগইন, রেজিস্ট্রেশন ও ভুল ইনপুটের জন্য ইউজার-ফ্রেন্ডলি টোস্ট নোটিফিকেশন (`react-hot-toast`)।

5. **📱 ফুললি রেসপনসিভ ও মার্জিত ডিজাইন (Fully Responsive UI with Google Sans & DaisyUI):**
   - মোবাইল, ট্যাবলেট ও ডেস্কটপ—যেকোনো ডিভাইসে চমৎকার প্রদর্শন।
   - ফিগমা ডিজাইনের সাথে শতভাগ মিল রেখে কাস্টম `bazardor` থিম এবং গুগল সান্স (Google Sans / Hind Siliguri) বাংলা ফন্ট।
   - ডেটা লোডিংয়ের সময় আকর্ষণীয় স্কেলিটন (Skeleton) লোডার এবং ভুল লিংকের জন্য বন্ধুত্বপূর্ণ ৪০৪ পেজ।

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

| প্রযুক্তি | ব্যবহারের উদ্দেশ্য |
| :--- | :--- |
| **Next.js 15 (App Router)** | আধুনিক ফুল-স্ট্যাক ফ্রেমওয়ার্ক, এসএসআর (SSR) ও গতিশীল রাউটিং |
| **React 19** | ইন্টারঅ্যাক্টিভ ক্লায়েন্ট ও সার্ভার কম্পোনেন্টস |
| **TypeScript** | টাইপ সেফটি ও কোডের নির্ভরযোগ্যতা |
| **Tailwind CSS & DaisyUI** | আধুনিক রেসপনসিভ ডিজাইন ও কাস্টম থিমিং |
| **BetterAuth** | ব্যবহারকারী প্রমাণীকরণ (Authentication) ও অ্যাকাউন্ট ব্যবস্থাপনা |
| **Better-SQLite3** | লোকাল ও সার্ভারলেস ডাটাবেজ সমাধান |
| **React Hot Toast** | মসৃণ ও দৃষ্টিনন্দন নোটিফিকেশন ব্যবস্থাপনা |

---

## 🚀 লোকাল সেটআপ ও রান করার নিয়ম (Installation & Setup)

১. রিপোজিটরিটি ক্লোন করুন:
```bash
git clone https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor.git
cd B14-A7-Bazar-Dor
```

২. প্রয়োজনীয় ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

৩. এনভায়রনমেন্ট ভেরিয়েবল সেট করুন (`.env.local` তৈরি করুন):
```env
BETTER_AUTH_SECRET="bazardor_super_secret_auth_token_key_2026_exam"
BETTER_AUTH_URL="http://localhost:3000"
```

৪. ডেভেলপমেন্ট সার্ভার চালু করুন:
```bash
npm run dev
```

৫. Visit the website: [http://baazardoor.vercel.app](http://baazardoor.vercel.app)

৬. প্রোডাকশন বিল্ড তৈরি ও টেস্ট করতে:
```bash
npm run build
npm run start
```

---

## 🌐 ব্যবহৃত এপিআই বিবরণ (API Endpoints)

- **সকল পণ্য:** `https://api.api-store.workers.dev/api/bazardor/products`
- **ক্যাটাগরি ফিল্টার:** `https://api.api-store.workers.dev/api/bazardor/products?category=chal`
- **একক পণ্য:** `https://api.api-store.workers.dev/api/bazardor/products/1`
- **সকল ক্যাটাগরি:** `https://api.api-store.workers.dev/api/bazardor/categories`
- **একক ক্যাটাগরি:** `https://api.api-store.workers.dev/api/bazardor/categories/chal`

---

## 👨‍💻 অবদান ও লাইসেন্স

এই প্রকল্পটি প্রোগ্রামিং হিরো ব্যাচ ১৪ (Programming Hero Batch 14) অ্যাসাইনমেন্ট ৭ এর জন্য তৈরি। সকল অধিকার সংরক্ষিত।
