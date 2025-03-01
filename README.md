# Simple Employee Management App

A **React-based** Employee Management App with authentication using **Clerk**, form validation with **React Hook Form** and **Zod**, data display with **AG Grid**, and styling with **ShadCN UI**. The app persists data using **localStorage** and sends employee details via email using **EmailJS**.

## 🚀 Features

- 🔑 **Authentication** with Clerk
- ✅ **Form Validation** using React Hook Form & Zod
- 📊 **Employee Data Table** with AG Grid
- 🎨 **UI Components** styled with ShadCN UI
- 💾 **Data Persistence** using localStorage
- 📧 **Email Integration** via EmailJS

---

## 📦 Installation

Clone the repository and install dependencies:

```sh
# Clone the repo
git clone https://github.com/yourusername/employee-management-app.git
cd employee-management-app

# Install dependencies
npm install
```

---

## 🛠️ Usage

### 1️⃣ Start the Development Server
```sh
npm run dev
```

### 2️⃣ Open the App
Visit `http://localhost:3000` in your browser.

---

## 🔑 Authentication Setup (Clerk)

1. Sign up at [Clerk.dev](https://clerk.dev/).
2. Create a new Clerk application.
3. Copy your **Publishable Key**.
4. Add them to `.env`:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
  
   ```

---

## 📝 Form Validation (React Hook Form & Zod)

The employee form is validated using **Zod** schemas:


---

## 📊 Employee Data Grid (AG Grid)

The app displays employee records using **AG Grid**:


---

## 💾 Data Persistence (localStorage)

Employees are stored locally to persist data across sessions:


---

## 📧 Email Notification (EmailJS)

1. Create an account on [EmailJS](https://www.emailjs.com/).
2. Get your **Service ID**, **Template ID**, and **User ID**.
3. Configure it in your app:
  

---


## 📞 Contact

- **Email:** kkausik11@gmail.com



