import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Campaigns = () => {
  const { API_URL } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'email',
    budget: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${API_URL}/campaigns`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCampaigns(response.data.campaigns);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/campaigns`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFormData({
        name: '',
        description: '',
        type: 'email',
        budget: '',
        startDate: '',
        endDate: '',
      });
      setShowForm(false);
      fetchCampaigns();
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/campaigns/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        fetchCampaigns();
      } catch (error) {
        console.error('Failed to delete campaign:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading campaigns...</p>
      </div>
    );
  }

  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.spend || 0), 0);
  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketing Campaigns</h1>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>New Campaign</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <p className="text-gray-600 text-sm">Total Campaigns</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{campaigns.length}</p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">Active Campaigns</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{activeCampaigns}</p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">Budget Utilization</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {totalBudget > 0 ? Math.round((totalSpend / totalBudget) * 100) : 0}%
          </p>
        </Card>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Campaign</h2>
          <form onSubmit={handleAddCampaign} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Campaign Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="email">Email</option>
                <option value="social">Social Media</option>
                <option value="event">Event</option>
                <option value="content">Content</option>
                <option value="paid_ads">Paid Ads</option>
              </select>
              <input
                type="number"
                placeholder="Budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows="3"
            />
            <div className="flex space-x-3">
              <Button type="submit">Save Campaign</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-center py-8">No campaigns yet</p>
          </Card>
        ) : (
          campaigns.map((campaign) => (
            <Card key={campaign._id} className="hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{campaign.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div>
                      <span className="font-medium text-gray-900">
                        ${(campaign.spend || 0).toLocaleString()}
                      </span>
                      <span className="text-gray-500"> / ${(campaign.budget || 0).toLocaleString()}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : campaign.status === 'planning'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  {campaign.budget > 0 && (
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min((campaign.spend / campaign.budget) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(campaign._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Campaigns;
