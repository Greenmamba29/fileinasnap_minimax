import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardOverview } from '../components/DashboardOverview';
import { MediaInsights } from '../components/MediaInsights';
import { FileHistory } from '../components/FileHistory';
import { ActivityFeed } from '../components/ActivityFeed';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';
import { colors } from '../lib/design-system';

const DashboardPage: React.FC = () => {
  const { setPageTitle } = useAccessibleRouting();

  React.useEffect(() => {
    setPageTitle('Dashboard - FileInASnap');
  }, [setPageTitle]);

  return (
    <>
      <Helmet>
        <title>Dashboard - FileInASnap</title>
        <meta name="description" content="Your file management dashboard with AI-powered insights and organization tools." />
      </Helmet>
      
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            Dashboard
          </h1>
          <p 
            className="text-lg"
            style={{ color: colors.text.secondary }}
          >
            Welcome to your intelligent file management dashboard
          </p>
        </div>

        {/* Main Dashboard Content */}
        <DashboardOverview />

        {/* Additional Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Media Insights
            </h2>
            <MediaInsights />
          </div>
          
          <div>
            <h2 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Recent Activity
            </h2>
            <ActivityFeed />
          </div>
        </div>

        {/* File History Section */}
        <div>
          <h2 
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text.primary }}
          >
            File History
          </h2>
          <FileHistory />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;