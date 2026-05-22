# Sales Management CRM

A comprehensive, full-stack Customer Relationship Management (CRM) system built with React, Node.js, Express, and MongoDB. Features role-based authentication, dashboards, and analytics for different user roles including Sales Representatives, Sales Managers, Account Managers, Marketing Teams, Product Managers, and Executive Leadership.

## 🎯 Features

### Role-Based Access Control
- **Sales Representative**: Customer management, sales activities, opportunity tracking
- **Sales Manager**: Team performance, territory assignment, forecast reports
- **Account Manager**: Customer interaction history, satisfaction metrics, account plans
- **Marketing Team**: Campaign tracking, lead sharing, customer segmentation
- **Product Manager**: Product updates, customer feedback, feature requests
- **Executive Leadership**: Revenue analytics, KPIs, regional performance, forecasts

### Core Features
- ✅ JWT-based authentication with role-based authorization
- ✅ Responsive UI with Tailwind CSS
- ✅ Modern dashboard design with Recharts analytics
- ✅ CRUD operations for all entities
- ✅ Search and filtering capabilities
- ✅ Real-time data updates
- ✅ Form validation
- ✅ Sidebar navigation
- ✅ User profile management

## 🏗️ Project Structure

```
SalesManagementCRM/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── dashboards/     # Role-based dashboards
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   ├── services/       # API services
│   │   ├── context/        # React context
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                 # Node.js/Express backend
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── controllers/         # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── seeds/              # Seed data
│   ├── config/             # Configuration files
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── database/
│   └── schemas.md          # Database schema documentation
├── docs/
│   ├── API.md              # API documentation
│   ├── SETUP.md            # Setup instructions
│   └── FEATURES.md         # Feature documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:kanishik0011/sales-crm.git
   cd sales-crm
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Seed Database (Optional)**
   ```bash
   cd server
   npm run seed
   ```

### Default Credentials (After Seeding)

```
Sales Rep:
- Email: rep@example.com
- Password: password123

Sales Manager:
- Email: manager@example.com
- Password: password123

Account Manager:
- Email: account@example.com
- Password: password123

Marketing:
- Email: marketing@example.com
- Password: password123

Product Manager:
- Email: product@example.com
- Password: password123

Executive:
- Email: executive@example.com
- Password: password123
```

## 📚 Database Collections

- **Users**: User accounts with roles
- **Customers**: Customer information
- **Activities**: Sales activities and meetings
- **Leads**: Sales leads and opportunities
- **Opportunities**: Sales opportunities
- **Campaigns**: Marketing campaigns
- **Products**: Product information
- **Feedback**: Customer feedback
- **AccountPlans**: Account management plans
- **Renewals**: Renewal reminders
- **PerformanceMetrics**: Sales performance data
- **DiscountRequests**: Discount request tracking

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in with email and password
2. Server generates JWT token
3. Token stored in localStorage (client)
4. Token sent in Authorization header for API requests
5. Middleware validates token and checks role
6. Access granted/denied based on user role

## 📡 API Routes

All API routes require authentication. See [API.md](./docs/API.md) for complete documentation.

```
GET    /api/auth/me              # Get current user
POST   /api/auth/login           # Login
POST   /api/auth/logout          # Logout

GET    /api/customers            # List customers
POST   /api/customers            # Create customer
GET    /api/customers/:id        # Get customer
PUT    /api/customers/:id        # Update customer
DELETE /api/customers/:id        # Delete customer

# ... and many more routes
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Charts and analytics
- **React Router v6** - Routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcryptjs** - Password hashing

## 🎨 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Tailwind CSS breakpoints (sm, md, lg, xl, 2xl)
- Collapsible sidebar on mobile
- Responsive charts and tables
- Touch-friendly interfaces

## 📝 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sales-crm
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Client (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## 📖 Documentation

- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [API Documentation](./docs/API.md) - Complete API reference
- [Features Guide](./docs/FEATURES.md) - Feature descriptions
- [Database Schema](./database/schemas.md) - Database design

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and style.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues and questions, please check the documentation or open an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**
