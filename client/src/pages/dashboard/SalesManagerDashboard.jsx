import React from 'react';

import Leads from '../Leads';
import Customers from '../Customers';
import Dashboard from '../Dashboard';

const SalesManagerDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Manager Dashboard</h1>
        <p className="text-gray-600 mt-2">Team performance, territory/lead assignment, approvals, forecasts and pipeline reports.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Team Performance</h2>
        <Dashboard />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Lead Assignment</h2>
        <Leads />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Territory Assignment</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Territory assignment UI should be implemented with your territory/assignment endpoints.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Discount Approval Workflow</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Discount approvals UI should be implemented with the DiscountRequest endpoints.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Pipeline Reports & Sales Forecast</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Pipeline/forecast charts should be connected to your metrics/reporting endpoints.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Team Customer View</h2>
        <Customers />
      </section>
    </div>
  );
};

export default SalesManagerDashboard;

