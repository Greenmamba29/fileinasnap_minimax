import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AIAnalysis } from '../components/AIAnalysis';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';
import { colors } from '../lib/design-system';

const AIAnalysisPage: React.FC = () => {
  const { setPageTitle } = useAccessibleRouting();

  React.useEffect(() => {
    setPageTitle('AI Analysis - FileInASnap');
  }, [setPageTitle]);

  return (
    <>
      <Helmet>
        <title>AI Analysis - FileInASnap</title>
        <meta name="description" content="Analyze documents and images with advanced AI capabilities for intelligent insights." />
      </Helmet>
      
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            AI Analysis
          </h1>
          <p 
            className="text-lg"
            style={{ color: colors.text.secondary }}
          >
            Analyze documents and images with advanced AI capabilities
          </p>
        </div>

        {/* AI Analysis Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: colors.primary.blue + '20' }}
              >
                <svg className="w-6 h-6" style={{ color: colors.primary.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                Document Analysis
              </h3>
            </div>
            <p style={{ color: colors.text.secondary }}>
              Extract text, analyze content, and understand document structure with AI
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: colors.primary.green + '20' }}
              >
                <svg className="w-6 h-6" style={{ color: colors.primary.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                Image Analysis
              </h3>
            </div>
            <p style={{ color: colors.text.secondary }}>
              Identify objects, extract text from images, and analyze visual content
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: colors.primary.purple + '20' }}
              >
                <svg className="w-6 h-6" style={{ color: colors.primary.purple }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                Smart Insights
              </h3>
            </div>
            <p style={{ color: colors.text.secondary }}>
              Get intelligent recommendations and insights about your content
            </p>
          </div>
        </div>

        {/* Main AI Analysis Component */}
        <AIAnalysis />
      </div>
    </>
  );
};

export default AIAnalysisPage;