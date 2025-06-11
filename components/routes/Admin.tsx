import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { TestimonialAPI } from '../../api/testimonials/index';
import { AuthAPI } from '../../api/auth/index';
import { DatabaseTestimonial } from '../../lib/database';

const AdminDashboard: React.FC = () => {
  const { user, token, logout, isAdmin } = useAuth();
  const [testimonials, setTestimonials] = useState<DatabaseTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  // Password change state
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    if (isAdmin && token) {
      fetchTestimonials();
    }
  }, [isAdmin, token]);

  const fetchTestimonials = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const data = await TestimonialAPI.getAllTestimonials(token);
      setTestimonials(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    if (!token) return;

    setActionLoading(id);
    try {
      await TestimonialAPI.approveTestimonial(id, token);
      setTestimonials(prev => 
        prev.map(testimonial => 
          testimonial.id === id 
            ? { ...testimonial, is_approved: true }
            : testimonial
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Are you sure you want to delete this testimonial?')) return;

    setActionLoading(id);
    try {
      await TestimonialAPI.deleteTestimonial(id, token);
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    setPasswordLoading(true);
    setError('');
    setPasswordSuccess('');

    try {
      await AuthAPI.changePassword(
        passwordFormData.currentPassword,
        passwordFormData.newPassword,
        token!
      );

      setPasswordSuccess('Password changed successfully');
      setPasswordFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-theme-primary mb-4">Access Denied</h2>
          <p className="text-theme-secondary mb-6">You don't have permission to access this page.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-theme text-white px-6 py-2 rounded-lg hover:bg-theme-hover transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-theme-primary">Admin Dashboard</h1>
            <p className="text-theme-secondary">Welcome back, {user?.name}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 border border-theme-border text-theme-primary rounded-lg hover:bg-theme-card transition-colors"
            >
              View Site
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button 
              onClick={() => setError('')}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Success Message */}
        {passwordSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            {passwordSuccess}
            <button 
              onClick={() => setPasswordSuccess('')}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-theme"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-theme-card p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-theme-primary mb-2">Total Testimonials</h3>
                <p className="text-3xl font-bold text-theme">{testimonials.length}</p>
              </div>
              <div className="bg-theme-card p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-theme-primary mb-2">Approved</h3>
                <p className="text-3xl font-bold text-green-600">
                  {testimonials.filter(t => t.is_approved).length}
                </p>
              </div>
              <div className="bg-theme-card p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-theme-primary mb-2">Pending</h3>
                <p className="text-3xl font-bold text-yellow-600">
                  {testimonials.filter(t => !t.is_approved).length}
                </p>
              </div>
            </div>

            {/* Testimonials List */}
            <div className="bg-theme-card rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-theme-border">
                <h2 className="text-xl font-semibold text-theme-primary">Manage Testimonials</h2>
              </div>

              {testimonials.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-theme-secondary">No testimonials found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-theme-background">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                          Quote
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-theme-secondary uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-theme-border">
                      {testimonials.map((testimonial) => (
                        <tr key={testimonial.id} className="hover:bg-theme-background">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={testimonial.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.author || 'User')}&background=6366f1&color=fff&size=40`}
                                alt={testimonial.author}
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-theme-primary">
                                  {testimonial.author}
                                </div>
                                {testimonial.title && (
                                  <div className="text-sm text-theme-secondary">
                                    {testimonial.title}
                                    {testimonial.company && `, ${testimonial.company}`}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-theme-primary max-w-xs truncate">
                              {testimonial.quote}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              testimonial.is_approved
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {testimonial.is_approved ? 'Approved' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-theme-secondary">
                            {new Date(testimonial.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {!testimonial.is_approved && (
                              <button
                                onClick={() => handleApprove(testimonial.id)}
                                disabled={actionLoading === testimonial.id}
                                className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              >
                                {actionLoading === testimonial.id ? 'Approving...' : 'Approve'}
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(testimonial.id)}
                              disabled={actionLoading === testimonial.id}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            >
                              {actionLoading === testimonial.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Password Change Form */}
            <div className="bg-theme-card rounded-lg shadow mt-8">
              <div className="px-6 py-4 border-b border-theme-border">
                <h2 className="text-xl font-semibold text-theme-primary">Change Password</h2>
              </div>
              <div className="px-6 py-4">
                <form onSubmit={handlePasswordChange}>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-theme-primary mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordFormData.currentPassword}
                        onChange={(e) => setPasswordFormData({ ...passwordFormData, currentPassword: e.target.value })}
                        required
                        className="block w-full px-4 py-2 border border-theme-border rounded-lg focus:ring-2 focus:ring-theme focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-primary mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordFormData.newPassword}
                        onChange={(e) => setPasswordFormData({ ...passwordFormData, newPassword: e.target.value })}
                        required
                        className="block w-full px-4 py-2 border border-theme-border rounded-lg focus:ring-2 focus:ring-theme focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-primary mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordFormData.confirmPassword}
                        onChange={(e) => setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value })}
                        required
                        className="block w-full px-4 py-2 border border-theme-border rounded-lg focus:ring-2 focus:ring-theme focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="w-full px-4 py-2 bg-theme text-white rounded-lg hover:bg-theme-hover transition-colors disabled:opacity-50"
                    >
                      {passwordLoading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;