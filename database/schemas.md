# Sales Management CRM - Database Schemas

Complete MongoDB schema documentation for all collections.

## Users Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['Sales Representative', 'Sales Manager', 'Account Manager', 'Marketing Team', 'Product Manager', 'Executive Leadership'], required),
  department: String,
  phone: String,
  profilePicture: String (URL),
  status: String (enum: ['active', 'inactive'], default: 'active'),
  manager: ObjectId (reference to User),
  territory: String,
  target: {
    monthly: Number,
    quarterly: Number,
    annual: Number
  },
  createdAt: Date,
  updatedAt: Date,
  lastLogin: Date
}
```

## Customers Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  phone: String,
  company: String,
  industry: String,
  location: String,
  address: String,
  website: String,
  status: String (enum: ['active', 'inactive', 'lost'], default: 'active'),
  assignedTo: ObjectId (reference to User),
  primaryContact: {
    name: String,
    email: String,
    phone: String,
    title: String
  },
  metadata: {
    annualRevenue: Number,
    employeeCount: Number,
    yearFounded: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Activities Collection

```javascript
{
  _id: ObjectId,
  type: String (enum: ['Call', 'Meeting', 'Email', 'Proposal', 'Demo'], required),
  title: String (required),
  description: String,
  customerId: ObjectId (reference to Customer, required),
  userId: ObjectId (reference to User, required),
  status: String (enum: ['planned', 'completed', 'cancelled'], default: 'planned'),
  date: Date (required),
  duration: Number (in minutes),
  outcome: String,
  notes: String,
  attachments: [String] (URLs),
  createdAt: Date,
  updatedAt: Date
}
```

## Leads Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  phone: String,
  company: String,
  industry: String,
  status: String (enum: ['new', 'contacted', 'qualified', 'converted', 'rejected'], default: 'new'),
  source: String (enum: ['website', 'referral', 'campaign', 'event', 'cold_call', 'other']),
  rating: Number (1-5),
  assignedTo: ObjectId (reference to User),
  campaignId: ObjectId (reference to Campaign),
  convertedCustomerId: ObjectId (reference to Customer),
  qualificationScore: Number,
  budget: Number,
  timeline: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Opportunities Collection

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  customerId: ObjectId (reference to Customer, required),
  userId: ObjectId (reference to User, required),
  amount: Number (required),
  stage: String (enum: ['Lead', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'], required),
  probability: Number (0-100),
  expectedCloseDate: Date,
  actualCloseDate: Date,
  status: String (enum: ['active', 'closed'], default: 'active'),
  closeReason: String,
  nextStep: String,
  nextStepDate: Date,
  competition: [String],
  notes: String,
  attachments: [String] (URLs),
  createdAt: Date,
  updatedAt: Date
}
```

## Campaigns Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String,
  type: String (enum: ['email', 'social', 'event', 'content', 'paid_ads', 'other']),
  status: String (enum: ['planning', 'active', 'completed', 'archived'], default: 'planning'),
  budget: Number,
  spend: Number (default: 0),
  startDate: Date,
  endDate: Date,
  targetAudience: String,
  leadGoal: Number,
  leadsGenerated: Number (default: 0),
  conversionRate: Number,
  roi: Number,
  owner: ObjectId (reference to User),
  channels: [String],
  metrics: {
    reach: Number,
    impressions: Number,
    clicks: Number,
    conversions: Number
  },
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Products Collection

```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String,
  sku: String (unique),
  category: String,
  price: Number (required),
  currency: String (default: 'USD'),
  status: String (enum: ['active', 'beta', 'deprecated', 'planned'], default: 'active'),
  version: String,
  features: [String],
  documentation: String (URL),
  specifications: {
    [key: String]: String
  },
  releaseDate: Date,
  deprecationDate: Date,
  owner: ObjectId (reference to User - Product Manager),
  createdAt: Date,
  updatedAt: Date
}
```

## Feedback Collection

```javascript
{
  _id: ObjectId,
  type: String (enum: ['feature_request', 'bug_report', 'improvement', 'general'], required),
  title: String (required),
  description: String (required),
  productId: ObjectId (reference to Product),
  customerId: ObjectId (reference to Customer),
  userId: ObjectId (reference to User),
  priority: String (enum: ['low', 'medium', 'high', 'critical']),
  status: String (enum: ['open', 'under_review', 'planned', 'in_progress', 'completed'], default: 'open'),
  votes: Number (default: 0),
  attachments: [String] (URLs),
  response: String,
  respondedBy: ObjectId (reference to User),
  respondedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## AccountPlans Collection

```javascript
{
  _id: ObjectId,
  customerId: ObjectId (reference to Customer, required),
  accountManagerId: ObjectId (reference to User, required),
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  goals: [{
    description: String,
    targetValue: Number,
    currentValue: Number,
    dueDate: Date
  }],
  stakeholders: [{
    name: String,
    title: String,
    email: String,
    phone: String
  }],
  riskFactors: [String],
  opportunities: [String],
  competitiveAnalysis: String,
  renewalDate: Date,
  contractValue: Number,
  notes: String,
  attachments: [String] (URLs),
  createdAt: Date,
  updatedAt: Date
}
```

## Renewals Collection

```javascript
{
  _id: ObjectId,
  customerId: ObjectId (reference to Customer, required),
  accountManagerId: ObjectId (reference to User, required),
  product: String,
  contractValue: Number,
  renewalDate: Date,
  daysUntilRenewal: Number,
  status: String (enum: ['at_risk', 'tracking', 'closed_won', 'closed_lost'], default: 'tracking'),
  riskLevel: String (enum: ['low', 'medium', 'high'], default: 'low'),
  reason: String,
  notes: String,
  lastContactDate: Date,
  nextFollowUpDate: Date,
  outcome: String,
  renewedValue: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## PerformanceMetrics Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User, required),
  period: String (enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annual'], required),
  date: Date,
  metrics: {
    activitiesLogged: Number,
    callsMade: Number,
    meetingsScheduled: Number,
    opportunitiesCreated: Number,
    opportunitiesClosed: Number,
    revenue: Number,
    pipelineValue: Number,
    winRate: Number,
    averageDealSize: Number
  },
  targets: {
    activitiesTarget: Number,
    callsTarget: Number,
    revenueTarget: Number
  },
  achievements: [String],
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## DiscountRequests Collection

```javascript
{
  _id: ObjectId,
  customerId: ObjectId (reference to Customer, required),
  requestedBy: ObjectId (reference to User, required),
  product: String,
  originalPrice: Number,
  discountPercentage: Number,
  discountedPrice: Number,
  reason: String,
  justification: String,
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending'),
  approvedBy: ObjectId (reference to User),
  rejectionReason: String,
  approvalDate: Date,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Indexes

For optimal performance, the following indexes should be created:

```javascript
// Users
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ role: 1 })
db.users.createIndex({ status: 1 })

// Customers
db.customers.createIndex({ email: 1 }, { unique: true })
db.customers.createIndex({ assignedTo: 1 })
db.customers.createIndex({ status: 1 })
db.customers.createIndex({ createdAt: -1 })

// Activities
db.activities.createIndex({ customerId: 1 })
db.activities.createIndex({ userId: 1 })
db.activities.createIndex({ date: -1 })
db.activities.createIndex({ status: 1 })

// Leads
db.leads.createIndex({ email: 1 })
db.leads.createIndex({ assignedTo: 1 })
db.leads.createIndex({ status: 1 })
db.leads.createIndex({ source: 1 })

// Opportunities
db.opportunities.createIndex({ customerId: 1 })
db.opportunities.createIndex({ userId: 1 })
db.opportunities.createIndex({ stage: 1 })
db.opportunities.createIndex({ expectedCloseDate: 1 })

// Campaigns
db.campaigns.createIndex({ status: 1 })
db.campaigns.createIndex({ owner: 1 })
db.campaigns.createIndex({ startDate: 1, endDate: 1 })

// Feedback
db.feedback.createIndex({ productId: 1 })
db.feedback.createIndex({ customerId: 1 })
db.feedback.createIndex({ status: 1 })

// AccountPlans
db.accountplans.createIndex({ customerId: 1 })
db.accountplans.createIndex({ accountManagerId: 1 })

// Renewals
db.renewals.createIndex({ customerId: 1 })
db.renewals.createIndex({ renewalDate: 1 })
db.renewals.createIndex({ status: 1 })

// PerformanceMetrics
db.performancemetrics.createIndex({ userId: 1, period: 1, date: -1 })

// DiscountRequests
db.discountrequests.createIndex({ requestedBy: 1, status: 1 })
db.discountrequests.createIndex({ approvedBy: 1 })
```

## Relationships

```
User
  ├── Many Activities
  ├── Many Customers (assigned)
  ├── Many Opportunities
  ├── Many Leads (assigned)
  └── Many PerformanceMetrics

Customer
  ├── Many Activities
  ├── Many Opportunities
  ├── Many AccountPlans
  ├── Many Renewals
  ├── Many DiscountRequests
  └── Many Feedback

Campaign
  ├── Many Leads
  └── Many Feedback

Product
  ├── Many Feedback
  └── Many Opportunities

AccountPlan
  └── One Customer

Renewal
  └── One Customer

DiscountRequest
  └── One Customer
```

---

**For API documentation, see [API.md](../docs/API.md)**

**For feature documentation, see [FEATURES.md](../docs/FEATURES.md)**
