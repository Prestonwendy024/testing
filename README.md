# Meridian Bank - Modern Banking Platform

A complete banking solution featuring a professional marketing website and a React-based online banking application.

## 🏦 Project Structure

```
meridian-bank/
├── index.html              # Main website (landing page)
├── website.html            # Alternative website file
├── src/                    # React banking application
│   ├── pages/             # App pages (admin & client)
│   ├── components/        # Reusable components
│   ├── context/           # State management
│   └── services/          # Database services
├── public/                # Static assets
└── database-schema.sql    # Database setup
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database (Optional)
```bash
npm run setup
```
Follow the instructions to connect to Supabase or another database.

### 3. Start Development Server
```bash
npm run dev
```

## 🌐 Website & App Access

### Website (Landing Page)
- **URL**: `http://localhost:3000/`
- **Purpose**: Marketing website with information about services
- **Features**: Professional design, service information, contact details

### Banking Application
- **URL**: `http://localhost:3000/app`
- **Purpose**: Functional online banking platform
- **Features**: Admin and client dashboards, transactions, accounts

## 📱 Features

### Website Features
- ✅ Professional banking website design
- ✅ Responsive mobile-first layout
- ✅ Service information and pricing
- ✅ Customer testimonials
- ✅ Contact information and newsletter
- ✅ SEO optimized

### Banking App Features
- ✅ **Admin Dashboard**: Manage clients, accounts, transactions
- ✅ **Client Dashboard**: View accounts, make transactions
- ✅ **Online Banking**: Deposits, withdrawals, transfers
- ✅ **Account Management**: Multiple account types
- ✅ **Transaction History**: Detailed transaction logs
- ✅ **Profile Management**: User profiles and settings
- ✅ **Cards & Wallet**: Digital payment solutions
- ✅ **Loans & Mortgages**: Loan application system

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Vite** for build tooling

### Backend (Optional)
- **Supabase** for database and authentication
- **PostgreSQL** for data storage
- **Real-time subscriptions**

### Design
- **Modern UI/UX** with glass morphism
- **Responsive design** for all devices
- **Professional banking aesthetics**

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

## 📊 Database Schema

The application includes a comprehensive database schema with:
- **Clients**: Customer information and profiles
- **Accounts**: Banking accounts and balances
- **Transactions**: Financial transaction history
- **Cards**: Credit and debit card management
- **Loans**: Loan applications and management

## 🔧 Development

### Available Scripts
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run setup            # Database setup
```

### Environment Variables
Create a `.env` file with:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 🚀 Deployment

### Website Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to any static hosting service
3. Configure routing to serve `index.html` for all routes

### App Deployment
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Configure environment variables

## 📱 Mobile Support

Both the website and app are fully responsive and optimized for:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

## 🔒 Security Features

- **Authentication**: Secure login system
- **Authorization**: Role-based access control
- **Data Encryption**: Secure data transmission
- **Input Validation**: Form validation and sanitization

## 📈 Performance

- **Fast Loading**: Optimized assets and lazy loading
- **SEO Friendly**: Meta tags and structured data
- **Accessibility**: WCAG compliant design
- **Cross-browser**: Works on all modern browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation in `DATABASE_SETUP.md`
- Review the code comments
- Open an issue on GitHub

---

**Meridian Bank** - Modern Banking Solutions for the Digital Age 