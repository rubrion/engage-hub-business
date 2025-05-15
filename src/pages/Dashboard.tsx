import { useState } from 'react';

import PageHelmet from '../components/PageHelmet';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const analyticsData = {
    visits: 1245,
    uniqueVisitors: 876,
    pageViews: 3289,
    bounceRate: '32.4%',
  };

  const recentActivity = [
    { id: 1, action: 'New user sign up', timestamp: '2 minutes ago' },
    { id: 2, action: 'Content updated on homepage', timestamp: '1 hour ago' },
    { id: 3, action: 'New blog post published', timestamp: '3 hours ago' },
    { id: 4, action: 'Support ticket resolved', timestamp: '1 day ago' },
  ];

  return (
    <div className="dashboard-page">
      <PageHelmet routeKey="DASHBOARD" />

      <h1>Dashboard</h1>

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button
          className={`tab ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Recent Activity
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="dashboard-overview">
            <h2>Welcome to your Dashboard</h2>
            <p>
              Here you can manage your application, view analytics, and monitor
              activity.
            </p>

            <div className="dashboard-stats-overview">
              <div className="stat-card">
                <h3>Visits Today</h3>
                <p className="stat-value">{analyticsData.visits}</p>
              </div>

              <div className="stat-card">
                <h3>Unique Visitors</h3>
                <p className="stat-value">{analyticsData.uniqueVisitors}</p>
              </div>

              <div className="stat-card">
                <h3>Page Views</h3>
                <p className="stat-value">{analyticsData.pageViews}</p>
              </div>

              <div className="stat-card">
                <h3>Bounce Rate</h3>
                <p className="stat-value">{analyticsData.bounceRate}</p>
              </div>
            </div>

            <div className="recent-activity-preview">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                {recentActivity.slice(0, 3).map((item) => (
                  <li key={item.id} className="activity-item">
                    <span className="activity-action">{item.action}</span>
                    <span className="activity-time">{item.timestamp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="dashboard-analytics">
            <h2>Analytics</h2>
            <p>Detailed analytics for your application</p>

            <div className="analytics-chart">
              {/* Placeholder for chart */}
              <div className="chart-placeholder">
                <p>Analytics Chart Placeholder</p>
              </div>
            </div>

            <div className="analytics-metrics">
              <table className="metrics-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Visits</td>
                    <td>1,245</td>
                    <td className="positive-change">+12.5%</td>
                  </tr>
                  <tr>
                    <td>Unique Visitors</td>
                    <td>876</td>
                    <td className="positive-change">+8.2%</td>
                  </tr>
                  <tr>
                    <td>Page Views</td>
                    <td>3,289</td>
                    <td className="positive-change">+15.7%</td>
                  </tr>
                  <tr>
                    <td>Bounce Rate</td>
                    <td>32.4%</td>
                    <td className="negative-change">+2.1%</td>
                  </tr>
                  <tr>
                    <td>Avg. Session Duration</td>
                    <td>2m 15s</td>
                    <td className="positive-change">+0.3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="dashboard-activity">
            <h2>Recent Activity</h2>
            <p>Latest actions and events in your application</p>

            <ul className="full-activity-list">
              {recentActivity.map((item) => (
                <li key={item.id} className="activity-item">
                  <span className="activity-action">{item.action}</span>
                  <span className="activity-time">{item.timestamp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="dashboard-settings">
            <h2>Dashboard Settings</h2>
            <p>Customize your dashboard experience</p>

            <form className="settings-form">
              <div className="form-group">
                <label htmlFor="theme">Dashboard Theme</label>
                <select id="theme" name="theme" defaultValue="light">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notifications">Email Notifications</label>
                <div className="toggle-switch">
                  <input type="checkbox" id="notifications" defaultChecked />
                  <label htmlFor="notifications"></label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="widgets">Visible Widgets</label>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="widget-analytics"
                      defaultChecked
                    />
                    <label htmlFor="widget-analytics">Analytics</label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="widget-activity"
                      defaultChecked
                    />
                    <label htmlFor="widget-activity">Activity</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="widget-tasks" defaultChecked />
                    <label htmlFor="widget-tasks">Tasks</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="widget-calendar" />
                    <label htmlFor="widget-calendar">Calendar</label>
                  </div>
                </div>
              </div>

              <button type="button" className="save-settings-btn">
                Save Settings
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
