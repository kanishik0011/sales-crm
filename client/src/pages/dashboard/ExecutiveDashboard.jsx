import React from 'react';

import Dashboard from '../Dashboard';

const ExecutiveDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Executive Leadership Dashboard</h1>
        <p className="text-gray-600 mt-2">Revenue analytics, regional KPIs, win/loss and forecasts.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">High-level Analytics</h2>
        <Dashboard />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Regional KPI Cards</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Regional KPI cards should be implemented with metrics/reporting endpoints.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Win/Loss Analytics</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Win/loss chart should be implemented.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Revenue Forecasts</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Revenue forecast dashboard should be implemented.
        </div>
      </section>
    </div>
  );
};

export default ExecutiveDashboard;

