import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SmartTagger } from '../components/SmartTagger';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';
import { colors } from '../lib/design-system';

const SmartTaggerPage: React.FC = () => {
  const { setPageTitle } = useAccessibleRouting();

  React.useEffect(() => {
    setPageTitle('Smart Tagger - FileInASnap');
  }, [setPageTitle]);

  const handleTagsGenerated = (tags: any) => {
    console.log('Generated tags:', tags);
    // In a real app, you would handle the generated tags here
  };

  return (
    <>
      <Helmet>
        <title>Smart Tagger - FileInASnap</title>
        <meta name="description" content="Generate intelligent tags for your files using AI analysis for better organization and searchability." />
      </Helmet>
      
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            Smart Tagging
          </h1>
          <p 
            className="text-lg"
            style={{ color: colors.text.secondary }}
          >
            Generate intelligent tags for your files using AI analysis
          </p>
        </div>

        {/* Tagging Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.blue + '20' }}
              >
                <svg className="w-5 h-5" style={{ color: colors.primary.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold" style={{ color: colors.text.primary }}>
                Content Tags
              </h3>
            </div>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Analyze file content to generate relevant topic and subject tags
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.green + '20' }}
              >
                <svg className="w-5 h-5" style={{ color: colors.primary.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold" style={{ color: colors.text.primary }}>
                Smart Categories
              </h3>
            </div>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Automatically categorize files based on content and context
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.purple + '20' }}
              >
                <svg className="w-5 h-5" style={{ color: colors.primary.purple }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold" style={{ color: colors.text.primary }}>
                Search Optimization
              </h3>
            </div>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Enhance discoverability with searchable tags and keywords
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.orange + '20' }}
              >
                <svg className="w-5 h-5" style={{ color: colors.primary.orange }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-base font-semibold" style={{ color: colors.text.primary }}>
                Batch Processing
              </h3>
            </div>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Process multiple files simultaneously for efficient tagging
            </p>
          </div>
        </div>

        {/* Tagging Benefits */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border" style={{ borderColor: colors.border.primary }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.primary }}>
            Why Smart Tagging?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1"
                style={{ backgroundColor: colors.semantic.success }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium mb-1" style={{ color: colors.text.primary }}>
                  Faster Discovery
                </h4>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  Find files instantly with intelligent tagging and semantic search
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1"
                style={{ backgroundColor: colors.semantic.success }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium mb-1" style={{ color: colors.text.primary }}>
                  Better Organization
                </h4>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  Organize files automatically based on content and context
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1"
                style={{ backgroundColor: colors.semantic.success }}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium mb-1" style={{ color: colors.text.primary }}>
                  Time Savings
                </h4>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  Eliminate manual tagging with AI-powered automation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Smart Tagger Component */}
        <SmartTagger 
          fileName="sample_document.pdf"
          mimeType="application/pdf"
          content="This is a sample document about project management and team collaboration strategies for modern workplaces. It covers topics like agile methodology, remote work best practices, and digital transformation initiatives."
          onTagsGenerated={handleTagsGenerated}
        />
      </div>
    </>
  );
};

export default SmartTaggerPage;