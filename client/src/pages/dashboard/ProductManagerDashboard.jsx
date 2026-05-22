import React from 'react';

import Dashboard from '../Dashboard';
import Customers from '../Customers';

const ProductManagerDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Product Manager Dashboard</h1>
        <p className="text-gray-600 mt-2">Roadmap, product updates, feedback and feature requests.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Product Roadmap</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Roadmap page should be implemented with Product/Roadmap endpoints (or a roadmap model).
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Product Updates</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Product updates page should be implemented.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Customer Feedback</h2>
        <Dashboard />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Product Documentation</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Product documentation module should be implemented.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Feature Request Tracker</h2>
        <Customers />
      </section>
    </div>
  );
};

export default ProductManagerDashboard;

