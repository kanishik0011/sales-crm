import React from 'react';

import Customers from '../Customers';

const AccountManagerDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Manager Dashboard</h1>
        <p className="text-gray-600 mt-2">Customer history, interactions, satisfaction, account plans and renewal reminders.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Customer History & Interactions</h2>
        <Customers />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Customer Satisfaction Metrics</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Satisfaction/NPS module should be implemented and connected to a satisfaction metrics endpoint.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Account Plan Management</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Account plan management UI should be implemented with AccountPlan endpoints.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Renewal Reminders</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Renewal reminders dashboard should be implemented with Renewal endpoints.
        </div>
      </section>
    </div>
  );
};

export default AccountManagerDashboard;

