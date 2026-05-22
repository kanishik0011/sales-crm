import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Opportunities = () => {
  const { API_URL } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    customerId: '',
    amount: '',
    stage: 'Lead',
    probability: '50',
    expectedCloseDate: '',
  });

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      const response = await axios.get(`${API_URL}/opportunities`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setOpportunities(response.data.opportunities);
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOpportunity = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/opportunities`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFormData({
        title: '',
        customerId: '',
        amount: '',
        stage: 'Lead',
        probability: '50',
        expectedCloseDate: '',
      });
      setShowForm(false);
      fetchOpportunities();
    } catch (error) {
      console.error('Failed to create opportunity:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/opportunities/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        fetchOpportunities();
      } catch (error) {
        console.error('Failed to delete opportunity:', error);
      }
    }
  };

  // Calculate pipeline by stage
  const pipelineData = [
    { stage: 'Lead', value: 0 },
    { stage: 'Qualification', value: 0 },
    { stage: 'Proposal', value: 0 },
    { stage: 'Negotiation', value: 0 },
    { stage: 'Closed Won', value: 0 },
    { stage: 'Closed Lost', value: 0 },
  ];

  opportunities.forEach((opp) => {
    const stageData = pipelineData.find((p) => p.stage === opp.stage);
    if (stageData) {
      stageData.value += opp.amount;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading opportunities...</p>
      </div>
    );
  }

  const stages = ['Lead', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>New Opportunity</span>
        </Button>
      </div>

      {/* Chart */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pipeline by Stage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pipelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Add Form */}
      {showForm && (
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Opportunity</h2>
          <form onSubmit={handleAddOpportunity} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Opportunity Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {stages.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Probability (%)"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) => setFormData({ ...formData, expectedCloseDate: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="flex space-x-3">
              <Button type="submit">Save Opportunity</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Kanban-style view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage) => (
          <Card key={stage} className="bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{stage}</h3>
            <div className="space-y-3 min-h-96">
              {opportunities
                .filter((opp) => opp.stage === stage)
                .map((opp) => (
                  <div
                    key={opp._id}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition border-l-4 border-blue-600"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{opp.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">${opp.amount.toLocaleString()}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-blue-600 font-medium">{opp.probability}%</span>
                      <button
                        onClick={() => handleDelete(opp._id)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
