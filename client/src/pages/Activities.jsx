import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

const Activities = () => {
  const { API_URL } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Call',
    title: '',
    description: '',
    customerId: '',
    date: '',
    duration: '',
    status: 'planned',
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API_URL}/activities`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setActivities(response.data.activities);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/activities`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFormData({
        type: 'Call',
        title: '',
        description: '',
        customerId: '',
        date: '',
        duration: '',
        status: 'planned',
      });
      setShowForm(false);
      fetchActivities();
    } catch (error) {
      console.error('Failed to create activity:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_URL}/activities/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        fetchActivities();
      } catch (error) {
        console.error('Failed to delete activity:', error);
      }
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/activities/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchActivities();
    } catch (error) {
      console.error('Failed to update activity:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Loading activities...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activities</h1>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center space-x-2">
          <Plus size={20} />
          <span>Log Activity</span>
        </Button>
      </div>

      {/* Add Activity Form */}
      {showForm && (
        <Card className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Log New Activity</h2>
          <form onSubmit={handleAddActivity} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option>Call</option>
                <option>Meeting</option>
                <option>Email</option>
                <option>Proposal</option>
                <option>Demo</option>
              </select>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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
              <Button type="submit">Save Activity</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Activities List */}
      <div className="space-y-4">
        {activities.length === 0 ? (
          <Card>
            <p className="text-gray-500 text-center py-8">No activities yet</p>
          </Card>
        ) : (
          activities.map((activity) => (
            <Card key={activity._id} className="hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {activity.type}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{new Date(activity.date).toLocaleString()}</span>
                    {activity.duration && <span>{activity.duration} min</span>}
                    <span className={`font-medium ${
                      activity.status === 'completed'
                        ? 'text-green-600'
                        : activity.status === 'cancelled'
                        ? 'text-red-600'
                        : 'text-blue-600'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {activity.status !== 'completed' && (
                    <button
                      onClick={() => handleStatusUpdate(activity._id, 'completed')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Mark as completed"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(activity._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Activities;
