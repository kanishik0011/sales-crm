import React from 'react';

import Customers from '../Customers';
import Activities from '../Activities';
import Opportunities from '../Opportunities';

const SalesRepDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sales Representative Dashboard</h1>
        <p className="text-gray-600 mt-2">Customer contact management, activities, pipeline and targets.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Customer Contacts</h2>
        <Customers />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Activities / Meetings</h2>
        <Activities />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Opportunities (Deal Values)</h2>
        <Opportunities />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Target Progress & Performance</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Target progress widgets/charts should be connected to your metrics endpoint.
        </div>
      </section>
    </div>
  );
};

export default SalesRepDashboard;

