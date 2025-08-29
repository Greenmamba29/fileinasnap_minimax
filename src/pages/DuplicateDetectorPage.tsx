import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DuplicateDetector } from '../components/DuplicateDetector';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';
import { colors } from '../lib/design-system';

const DuplicateDetectorPage: React.FC = () => {
  const { setPageTitle } = useAccessibleRouting();

  React.useEffect(() => {
    setPageTitle('Duplicate Detector - FileInASnap');
  }, [setPageTitle]);

  // Sample files for demonstration - in a real app, these would come from your file system
  const sampleFiles = [
    { 
      fileName: 'document.pdf', 
      size: 1024000, 
      mimeType: 'application/pdf', 
      hash: 'abc123456789',
      lastModified: new Date('2024-01-15').toISOString(),
      path: '/documents/document.pdf'
    },
    { 
      fileName: 'document_copy.pdf', 
      size: 1024000, 
      mimeType: 'application/pdf', 
      hash: 'abc123456789',
      lastModified: new Date('2024-01-16').toISOString(),
      path: '/documents/copies/document_copy.pdf'
    },
    { 
      fileName: 'similar_doc.pdf', 
      size: 1020000, 
      mimeType: 'application/pdf', 
      content: 'This document contains similar content to the original document with slight modifications for demonstration purposes.',
      hash: 'def456789012',
      lastModified: new Date('2024-01-17').toISOString(),
      path: '/documents/similar_doc.pdf'
    },
    { 
      fileName: 'vacation_photo.jpg', 
      size: 2048000, 
      mimeType: 'image/jpeg', 
      hash: 'xyz789012345',
      lastModified: new Date('2024-01-10').toISOString(),
      path: '/photos/vacation_photo.jpg'
    },
    { 
      fileName: 'IMG_001.jpg', 
      size: 2048000, 
      mimeType: 'image/jpeg', 
      hash: 'xyz789012345',
      lastModified: new Date('2024-01-11').toISOString(),
      path: '/photos/camera/IMG_001.jpg'
    }
  ];

  const handleDetectionComplete = (results: any) => {
    console.log('Duplicate detection results:', results);
    // In a real app, you would handle the duplicate detection results here
  };

  return (
    <>
      <Helmet>
        <title>Duplicate Detector - FileInASnap</title>
        <meta name="description" content="Find and manage duplicate files with AI-powered similarity detection to optimize storage space." />
      </Helmet>
      
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            Duplicate Detection
          </h1>
          <p 
            className="text-lg"
            style={{ color: colors.text.secondary }}
          >
            Find and manage duplicate files with AI-powered similarity detection
          </p>
        </div>

        {/* Detection Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: colors.semantic.warning + '20' }}
              >
                <svg className="w-6 h-6" style={{ color: colors.semantic.warning }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                Exact Matches
              </h3>
            </div>
            <p style={{ color: colors.text.secondary }}>
              Find files with identical content using hash-based comparison
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
                Smart Detection
              </h3>
            </div>
            <p style={{ color: colors.text.secondary }}>
              AI-powered analysis to find similar content with minor differences
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                style={{ backgroundColor: colors.semantic.success + '20' }}
              >
                <svg className="w-6 h-6" style={{ color: colors.semantic.success }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                Quick Actions
              </h3>
            </div>
            <p style={{ color: colors.text.secondary }}>
              One-click resolution with merge, delete, or keep options
            </p>
          </div>
        </div>

        {/* Detection Statistics */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border" style={{ borderColor: colors.border.primary }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text.primary }}>
            Detection Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.primary.blue }}>
                {sampleFiles.length}
              </div>
              <div className="text-sm" style={{ color: colors.text.secondary }}>
                Files Scanned
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.semantic.warning }}>
                2
              </div>
              <div className="text-sm" style={{ color: colors.text.secondary }}>
                Duplicate Groups
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.semantic.error }}>
                3MB
              </div>
              <div className="text-sm" style={{ color: colors.text.secondary }}>
                Wasted Space
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.semantic.success }}>
                60%
              </div>
              <div className="text-sm" style={{ color: colors.text.secondary }}>
                Space Savings
              </div>
            </div>
          </div>
        </div>

        {/* Main Duplicate Detector Component */}
        <DuplicateDetector 
          files={sampleFiles}
          onDetectionComplete={handleDetectionComplete}
        />
      </div>
    </>
  );
};

export default DuplicateDetectorPage;