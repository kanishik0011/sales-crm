import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('rep@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    if (result.success) {
      const role = result.data?.user?.role || result.data?.user?.role || null;
      const roleRedirectMap = {
        'Sales Representative': '/dashboard/sales-rep',
        'Sales Manager': '/dashboard/sales-manager',
        'Account Manager': '/dashboard/account-manager',
        'Marketing Team': '/dashboard/marketing',
        'Product Manager': '/dashboard/product',
        'Executive Leadership': '/dashboard/executive',
      };
      navigate(roleRedirectMap[role] || '/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales CRM</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm font-semibold text-gray-900 mb-2">Demo Credentials:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li><strong>Rep:</strong> rep@example.com</li>
            <li><strong>Manager:</strong> manager@example.com</li>
            <li><strong>Account:</strong> account@example.com</li>
            <li><strong>Marketing:</strong> marketing@example.com</li>
            <li><strong>Product:</strong> product@example.com</li>
            <li><strong>Executive:</strong> executive@example.com</li>
            <li><strong>Password:</strong> password123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
