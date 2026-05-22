import React from 'react';

import Campaigns from '../Campaigns';
import Leads from '../Leads';

const MarketingDashboard = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Marketing Team Dashboard</h1>
        <p className="text-gray-600 mt-2">Campaign ROI, lead sharing, segmentation and collaboration.</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Campaign Performance / ROI</h2>
        <Campaigns />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Qualified Lead Sharing Workflow</h2>
        <Leads />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Customer Segmentation & Marketing Insights</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Segmentation/insights module should be implemented with segmentation endpoints.
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Collaboration / Content</h2>
        <div className="bg-white rounded-lg shadow p-6 text-gray-600">
          Collaboration/content module should be implemented.
        </div>
      </section>
    </div>
  );
};

export default MarketingDashboard;

