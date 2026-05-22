import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Trash2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Leads = () => {
  const { API_URL } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    source: 'website',
    rating: '3',
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API_URL}/leads`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLeads(response.data.leads);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/leads`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        industry: '',
        source: 'website',
        rating: '3',
      });
      setShowForm(false);
      fetchLeads();
    } catch (error) {
      console.error('Failed to create lead:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/leads/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        fetchLeads();
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  // Lead source statistics
  const sourceStats = [
    { source: 'website', count: leads.filter((l) => l.source === 'website').length },
    { source: 'referral', count: leads.filter((l) => l.source === 'referral').length },
    { source: 'campaign', count: leads.filter((l) => l.source === 'campaign').length },
    { source: 'event', count: leads.filter((l) => l.source === 'event').length },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading leads...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Leads</h1>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Lead</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <p className="text-gray-600 text-sm">Total Leads</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{leads.length}</p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">New Leads</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {leads.filter((l) => l.status === 'new').length}
          </p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">Qualified</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {leads.filter((l) => l.status === 'qualified').length}
          </p>
        </Card>
        <Card>
          <p className="text-gray-600 text-sm">Converted</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {leads.filter((l) => l.status === 'converted').length}
          </p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lead Source Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sourceStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="source" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Add Form */}
      {showForm && (
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Lead</h2>
          <form onSubmit={handleAddLead} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                placeholder="Industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="campaign">Campaign</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <Button type="submit">Save Lead</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Leads List */}
      <Card>
        {leads.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No leads yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Company</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Source</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{lead.name}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">{lead.email}</td>
                    <td className="py-3 px-4 text-gray-600">{lead.company}</td>
                    <td className="py-3 px-4 text-gray-600 text-sm">/{lead.source}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'new'
                          ? 'bg-yellow-100 text-yellow-800'
                          : lead.status === 'qualified'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'converted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-yellow-500">{'★'.repeat(lead.rating || 0)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(lead._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Leads;
