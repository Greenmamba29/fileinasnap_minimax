import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SmartOrganizer } from '../components/SmartOrganizer';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';
import { colors } from '../lib/design-system';

const SmartOrganizerPage: React.FC = () => {
  const { setPageTitle } = useAccessibleRouting();

  React.useEffect(() => {
    setPageTitle('Smart Organizer - FileInASnap');
  }, [setPageTitle]);

  // Sample files for demonstration - in a real app, these would come from your file system
  const sampleFiles = [
    { 
      fileName: 'project_proposal.pdf', 
      mimeType: 'application/pdf', 
      size: 1024000, 
      category: 'document',
      lastModified: new Date('2024-01-15').toISOString()
    },
    { 
      fileName: 'vacation_photo.jpg', 
      mimeType: 'image/jpeg', 
      size: 512000, 
      category: 'image',
      lastModified: new Date('2024-01-10').toISOString()
    },
    { 
      fileName: 'meeting_notes.docx', 
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      size: 768000, 
      category: 'document',
      lastModified: new Date('2024-01-20').toISOString()
    },
    { 
      fileName: 'presentation_slides.pptx', 
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
      size: 2048000, 
      category: 'document',
      lastModified: new Date('2024-01-18').toISOString()
    },
    { 
      fileName: 'budget_spreadsheet.xlsx', 
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      size: 1536000, 
      category: 'document',
      lastModified: new Date('2024-01-12').toISOString()
    }
  ];

  const handleOrganizationComplete = (suggestions: any) => {
    console.log('Organization suggestions received:', suggestions);
    // In a real app, you would handle the organization suggestions here
  };

  return (
    <>
      <Helmet>
        <title>Smart Organizer - FileInASnap</title>
        <meta name="description" content="Get AI-powered suggestions for organizing your files efficiently with intelligent categorization." />
      </Helmet>
      
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ color: colors.text.primary }}
          >
            Smart Organization
          </h1>
          <p 
            className="text-lg"
            style={{ color: colors.text.secondary }}
          >
            Get AI-powered suggestions for organizing your files efficiently
          </p>
        </div>

        {/* Organization Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.blue + '20' }}
              >
                <svg className="w-4 h-4" style={{ color: colors.primary.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                Smart Folders
              </h3>
            </div>
            <p className="text-xs" style={{ color: colors.text.secondary }}>
              Automatically categorize files into intelligent folder structures
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.green + '20' }}
              >
                <svg className="w-4 h-4" style={{ color: colors.primary.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 010-2h4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11v6m4-6v6" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                Clean Duplicates
              </h3>
            </div>
            <p className="text-xs" style={{ color: colors.text.secondary }}>
              Identify and organize duplicate files for optimal storage
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.purple + '20' }}
              >
                <svg className="w-4 h-4" style={{ color: colors.primary.purple }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                Usage Patterns
              </h3>
            </div>
            <p className="text-xs" style={{ color: colors.text.secondary }}>
              Analyze file usage to suggest optimal organization strategies
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.orange + '20' }}
              >
                <svg className="w-4 h-4" style={{ color: colors.primary.orange }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold" style={{ color: colors.text.primary }}>
                Quick Actions
              </h3>
            </div>
            <p className="text-xs" style={{ color: colors.text.secondary }}>
              One-click organization with intelligent automation
            </p>
          </div>
        </div>

        {/* Main Smart Organizer Component */}
        <SmartOrganizer 
          files={sampleFiles}
          onOrganizationComplete={handleOrganizationComplete}
        />
      </div>
    </>
  );
};

export default SmartOrganizerPage;