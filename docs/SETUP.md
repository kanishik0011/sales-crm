# Sales Management CRM - Setup Guide

This guide will walk you through setting up the Sales Management CRM application on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** - Either:
  - Local installation: [Download MongoDB Community Edition](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)

### Verify Installation

```bash
node --version    # Should show v14.0.0 or higher
npm --version     # Should show 6.0.0 or higher
mongodb --version # If installed locally
```

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone git@github.com:kanishik0011/sales-crm.git
cd sales-crm
```

### Step 2: Setup MongoDB

#### Option A: Local MongoDB

1. **Install MongoDB Community Edition**
   - Windows: [Installer](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - macOS: `brew tap mongodb/brew` then `brew install mongodb-community`
   - Linux: Follow [Official Guide](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB**
   ```bash
   # macOS/Linux
   brew services start mongodb-community
   
   # Windows (if installed as service)
   net start MongoDB
   
   # Or run manually
   mongod
   ```

#### Option B: MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free
   - Create a new project

2. **Create a Cluster**
   - Select "Shared" (free tier)
   - Choose your preferred region
   - Click "Create Cluster"

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Save this for Step 4

### Step 3: Setup Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Step 4: Configure Environment Variables

Edit `server/.env` with your settings:

```bash
# .env file
PORT=5000
NODE_ENV=development

# MongoDB URI (choose one)
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/sales-crm

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sales-crm?retryWrites=true&w=majority

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Step 5: Seed Database (Optional but Recommended)

```bash
# Still in server directory
npm run seed
```

This will populate the database with:
- 6 test users (one for each role)
- 20 sample customers
- 30 sales activities
- 15 leads
- 20 opportunities
- 10 campaigns
- 5 products
- Customer feedback
- Account plans
- And more...

### Step 6: Start Backend Server

```bash
# In server directory
npm run dev
```

You should see:
```
Server running on http://localhost:5000
Connected to MongoDB
```

### Step 7: Setup Frontend

In a new terminal:

```bash
cd client

# Install dependencies
npm install
```

### Step 8: Start Frontend Development Server

```bash
# In client directory
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

### Step 9: Access the Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the login page.

## Default Test Accounts

If you ran the seed script, use these credentials to log in:

### Sales Representative
- **Email**: rep@example.com
- **Password**: password123

### Sales Manager
- **Email**: manager@example.com
- **Password**: password123

### Account Manager
- **Email**: account@example.com
- **Password**: password123

### Marketing Team
- **Email**: marketing@example.com
- **Password**: password123

### Product Manager
- **Email**: product@example.com
- **Password**: password123

### Executive Leadership
- **Email**: executive@example.com
- **Password**: password123

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solutions**:
1. Check MongoDB is running: `mongosh` (MongoDB Shell)
2. Verify `MONGODB_URI` in `.env` is correct
3. Check MongoDB firewall settings (if using Atlas)
4. Ensure database user has correct permissions (Atlas)

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill the process or change PORT in .env
```

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS`

**Solution**: Ensure backend is running and `VITE_API_URL` in client is correct

### Seed Data Not Showing

**Solution**:
```bash
# Clear database
db.users.deleteMany({})
# Re-run seed
npm run seed
```

## Project Structure Verification

After setup, verify these folders exist:

```
sales-crm/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── dashboards/
│   │   └── ...
│   └── package.json
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── seeds/
│   └── .env
├── database/
│   └── schemas.md
└── docs/
```

## Development Commands

### Backend
```bash
cd server
npm run dev        # Start development server
npm run seed       # Seed database
npm test           # Run tests (if configured)
npm run build      # Build for production
```

### Frontend
```bash
cd client
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## Next Steps

1. **Explore the Dashboard**: Log in with different roles to see role-specific dashboards
2. **Test Features**: Try creating customers, activities, opportunities, etc.
3. **Review Code**: Check `docs/FEATURES.md` for feature descriptions
4. **API Testing**: See `docs/API.md` for API endpoint documentation
5. **Customize**: Modify colors, branding, and features as needed

## Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)

## Need Help?

1. Check the [API Documentation](./API.md)
2. Review [Features Guide](./FEATURES.md)
3. Check [Database Schemas](../database/schemas.md)
4. Check browser console for frontend errors
5. Check terminal for backend errors

---

**Happy Coding! 🚀**
