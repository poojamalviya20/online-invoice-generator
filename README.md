# Online Invoice Generator

A modern full-stack invoice generation application built with **Next.js**, **NestJS**, and **PostgreSQL**. The platform enables users to create professional invoices online, calculate totals automatically, preview invoices in real time, and download them for sharing with clients.

## 🚀 Features

* Create professional invoices online
* Add company and customer information
* Dynamic invoice item management
* Automatic subtotal, tax, discount, and total calculations
* Real-time invoice preview
* Download invoices in a printable format
* Responsive and user-friendly interface
* Secure backend API architecture
* PostgreSQL database integration

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS / Modern UI Components

### Backend

* NestJS
* TypeScript
* REST APIs

### Database

* PostgreSQL

### Development Tools

* Git & GitHub
* npm

## 📋 How It Works

1. Enter business details.
2. Add customer information.
3. Add products or services with quantity and pricing.
4. Apply taxes or discounts if required.
5. Review the generated invoice in real time.
6. Download the invoice for printing or sharing.

## 📂 Project Structure

```text
online-invoice-generator/
├── frontend/          # Next.js Application
├── backend/           # NestJS API
├── database/          # PostgreSQL Configurations
├── docs/              # Project Documentation
└── README.md
```

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/online-invoice-generator.git
cd online-invoice-generator
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

### Database Setup

Create a PostgreSQL database and update the environment variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=invoicegenerator
DB_USER=postgres
DB_PASSWORD=your_password
```

## 🌟 Future Enhancements

* User authentication and authorization
* Invoice history management
* Email invoice delivery
* Multiple invoice templates
* PDF customization options
* Multi-currency support
* Dashboard and analytics

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js, NestJS, and PostgreSQL.
