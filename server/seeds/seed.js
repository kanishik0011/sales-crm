import User from '../models/User.js';
import Customer from '../models/Customer.js';
import Activity from '../models/Activity.js';
import Lead from '../models/Lead.js';
import Opportunity from '../models/Opportunity.js';
import Campaign from '../models/Campaign.js';
import Product from '../models/Product.js';
import Feedback from '../models/Feedback.js';
import AccountPlan from '../models/AccountPlan.js';
import Renewal from '../models/Renewal.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Customer.deleteMany({}),
      Activity.deleteMany({}),
      Lead.deleteMany({}),
      Opportunity.deleteMany({}),
      Campaign.deleteMany({}),
      Product.deleteMany({}),
      Feedback.deleteMany({}),
      AccountPlan.deleteMany({}),
      Renewal.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Create users
    const users = await User.create([
      {
        name: 'John Sales',
        email: 'rep@example.com',
        password: 'password123',
        role: 'Sales Representative',
        department: 'Sales',
        phone: '555-0101',
        territory: 'North America',
        target: { monthly: 50000, quarterly: 150000, annual: 600000 },
      },
      {
        name: 'Sarah Manager',
        email: 'manager@example.com',
        password: 'password123',
        role: 'Sales Manager',
        department: 'Sales',
        phone: '555-0102',
        territory: 'North America',
      },
      {
        name: 'Mike Account',
        email: 'account@example.com',
        password: 'password123',
        role: 'Account Manager',
        department: 'Customer Success',
        phone: '555-0103',
      },
      {
        name: 'Lisa Marketing',
        email: 'marketing@example.com',
        password: 'password123',
        role: 'Marketing Team',
        department: 'Marketing',
        phone: '555-0104',
      },
      {
        name: 'David Product',
        email: 'product@example.com',
        password: 'password123',
        role: 'Product Manager',
        department: 'Product',
        phone: '555-0105',
      },
      {
        name: 'Emma Executive',
        email: 'executive@example.com',
        password: 'password123',
        role: 'Executive Leadership',
        department: 'Executive',
        phone: '555-0106',
      },
    ]);
    console.log('✅ Created users');

    // Create customers
    const customers = await Customer.create([
      {
        name: 'Acme Corp',
        email: 'contact@acme.com',
        phone: '555-1234',
        company: 'Acme Corp',
        industry: 'Technology',
        location: 'New York',
        address: '123 Main St, New York, NY 10001',
        assignedTo: users[0]._id,
        status: 'active',
      },
      {
        name: 'TechStart Inc',
        email: 'info@techstart.com',
        phone: '555-5678',
        company: 'TechStart Inc',
        industry: 'Software',
        location: 'San Francisco',
        address: '456 Tech Ave, SF, CA 94105',
        assignedTo: users[0]._id,
        status: 'active',
      },
      {
        name: 'Global Solutions Ltd',
        email: 'sales@globalsolutions.com',
        phone: '555-9012',
        company: 'Global Solutions Ltd',
        industry: 'Consulting',
        location: 'Chicago',
        address: '789 Business Blvd, Chicago, IL 60601',
        assignedTo: users[0]._id,
        status: 'active',
      },
      {
        name: 'Finance Plus',
        email: 'contact@financeplus.com',
        phone: '555-3456',
        company: 'Finance Plus',
        industry: 'Finance',
        location: 'Boston',
        address: '321 Financial St, Boston, MA 02101',
        assignedTo: users[0]._id,
        status: 'active',
      },
      {
        name: 'Healthcare Systems',
        email: 'info@healthcaresys.com',
        phone: '555-7890',
        company: 'Healthcare Systems',
        industry: 'Healthcare',
        location: 'Atlanta',
        address: '654 Medical Way, Atlanta, GA 30301',
        assignedTo: users[0]._id,
        status: 'active',
      },
    ]);
    console.log('✅ Created customers');

    // Create activities
    const activities = await Activity.create([
      {
        type: 'Call',
        title: 'Initial sales call',
        description: 'Discussed requirements',
        customerId: customers[0]._id,
        userId: users[0]._id,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        duration: 30,
        status: 'completed',
      },
      {
        type: 'Meeting',
        title: 'Product demo',
        description: 'Demonstrated features',
        customerId: customers[1]._id,
        userId: users[0]._id,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        duration: 60,
        status: 'completed',
      },
      {
        type: 'Email',
        title: 'Follow up email',
        description: 'Sent proposal',
        customerId: customers[2]._id,
        userId: users[0]._id,
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        duration: 15,
        status: 'completed',
      },
    ]);
    console.log('✅ Created activities');

    // Create opportunities
    const opportunities = await Opportunity.create([
      {
        title: 'Acme Q1 License Renewal',
        customerId: customers[0]._id,
        userId: users[0]._id,
        amount: 50000,
        stage: 'Proposal',
        probability: 75,
        expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'active',
      },
      {
        title: 'TechStart Enterprise Package',
        customerId: customers[1]._id,
        userId: users[0]._id,
        amount: 75000,
        stage: 'Qualification',
        probability: 50,
        expectedCloseDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        status: 'active',
      },
      {
        title: 'Global Solutions Consulting',
        customerId: customers[2]._id,
        userId: users[0]._id,
        amount: 100000,
        stage: 'Negotiation',
        probability: 85,
        expectedCloseDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        status: 'active',
      },
    ]);
    console.log('✅ Created opportunities');

    // Create leads
    const leads = await Lead.create([
      {
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '555-1111',
        company: 'StartUp Co',
        industry: 'Technology',
        source: 'website',
        status: 'new',
        rating: 4,
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        phone: '555-2222',
        company: 'Growing Inc',
        industry: 'Software',
        source: 'referral',
        status: 'contacted',
        rating: 5,
      },
      {
        name: 'Bob Wilson',
        email: 'bob.wilson@company.com',
        phone: '555-3333',
        company: 'Enterprise Corp',
        industry: 'Finance',
        source: 'campaign',
        status: 'qualified',
        rating: 4,
      },
    ]);
    console.log('✅ Created leads');

    // Create campaigns
    const campaigns = await Campaign.create([
      {
        name: 'Q1 Product Launch',
        description: 'Launch new enterprise product',
        type: 'email',
        status: 'active',
        budget: 50000,
        spend: 35000,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        leadsGenerated: 25,
        owner: users[3]._id,
        metrics: {
          reach: 10000,
          impressions: 25000,
          clicks: 500,
          conversions: 25,
        },
      },
      {
        name: 'Partner Co-Marketing',
        description: 'Joint campaign with partners',
        type: 'event',
        status: 'active',
        budget: 75000,
        spend: 45000,
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        leadsGenerated: 40,
        owner: users[3]._id,
        metrics: {
          reach: 5000,
          impressions: 15000,
          clicks: 450,
          conversions: 40,
        },
      },
    ]);
    console.log('✅ Created campaigns');

    // Create products
    const products = await Product.create([
      {
        name: 'CRM Pro',
        description: 'Professional CRM solution',
        sku: 'CRM-PRO-001',
        category: 'Software',
        price: 5000,
        version: '1.0',
        status: 'active',
        features: ['Customer Management', 'Sales Pipeline', 'Reporting', 'Mobile Access'],
        owner: users[4]._id,
      },
      {
        name: 'CRM Enterprise',
        description: 'Enterprise CRM with advanced features',
        sku: 'CRM-ENT-001',
        category: 'Software',
        price: 15000,
        version: '2.0',
        status: 'active',
        features: ['Customer Management', 'Sales Pipeline', 'Advanced Reporting', 'API Access', 'Custom Integrations'],
        owner: users[4]._id,
      },
    ]);
    console.log('✅ Created products');

    // Create feedback
    await Feedback.create([
      {
        type: 'feature_request',
        title: 'Add mobile app',
        description: 'Request for native mobile application',
        productId: products[0]._id,
        priority: 'high',
        status: 'planned',
        votes: 25,
      },
      {
        type: 'improvement',
        title: 'Better reporting',
        description: 'Improve report generation and customization',
        productId: products[0]._id,
        priority: 'medium',
        status: 'open',
        votes: 15,
      },
    ]);
    console.log('✅ Created feedback');

    // Create account plans
    await AccountPlan.create([
      {
        customerId: customers[0]._id,
        accountManagerId: users[2]._id,
        name: 'Acme 2024 Account Plan',
        description: 'Growth strategy for Acme Corp',
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        renewalDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        contractValue: 150000,
        goals: [
          {
            description: 'Increase usage by 30%',
            targetValue: 30,
            currentValue: 15,
            dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    ]);
    console.log('✅ Created account plans');

    // Create renewals
    await Renewal.create([
      {
        customerId: customers[0]._id,
        accountManagerId: users[2]._id,
        product: 'CRM Pro License',
        contractValue: 50000,
        renewalDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        daysUntilRenewal: 90,
        status: 'tracking',
        riskLevel: 'low',
      },
    ]);
    console.log('✅ Created renewals');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Default Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    users.forEach((user) => {
      console.log(`${user.role}:`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: password123\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
