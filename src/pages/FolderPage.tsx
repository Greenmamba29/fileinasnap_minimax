import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';
import { useFolderNavigation } from '../hooks/useRouteParams';
import { colors } from '../lib/design-system';

const FolderPage: React.FC = () => {
  const { folderType } = useParams<{ folderType: string }>();
  const { setPageTitle } = useAccessibleRouting();
  const { view, sort, filter, setView, setSort, setFilter } = useFolderNavigation();

  // Folder configurations
  const folderConfigs = {
    documents: {
      title: 'Documents',
      description: 'All your document files with AI-powered insights',
      icon: '📄',
      color: colors.primary.blue,
      features: ['Auto-tagging', 'Content analysis', 'Smart organization']
    },
    media: {
      title: 'Media Files',
      description: 'Images, videos, and audio files with advanced AI insights',
      icon: '🎨',
      color: colors.primary.green,
      features: ['Image analysis', 'Object detection', 'OCR text extraction']
    },
    projects: {
      title: 'Projects',
      description: 'Organize your project-related files with AI assistance',
      icon: '🗂️',
      color: colors.primary.purple,
      features: ['Project grouping', 'Duplicate detection', 'Smart summaries']
    },
    archive: {
      title: 'Archive',
      description: 'Older files automatically archived with AI-powered organization',
      icon: '📦',
      color: colors.text.secondary,
      features: ['Auto-archiving', 'Usage analysis', 'Smart search']
    }
  };

  const currentFolder = folderConfigs[folderType as keyof typeof folderConfigs] || folderConfigs.documents;

  React.useEffect(() => {
    setPageTitle(`${currentFolder.title} - FileInASnap`);
  }, [setPageTitle, currentFolder.title]);

  const viewOptions = [
    { value: 'grid', label: 'Grid View', icon: '⊞' },
    { value: 'list', label: 'List View', icon: '☰' },
    { value: 'timeline', label: 'Timeline', icon: '📊' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'date', label: 'Date Modified' },
    { value: 'size', label: 'File Size' },
    { value: 'type', label: 'File Type' },
    { value: 'relevance', label: 'AI Relevance' }
  ];

  return (
    <>
      <Helmet>
        <title>{currentFolder.title} - FileInASnap</title>
        <meta name="description" content={currentFolder.description} />
      </Helmet>
      
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <div className="flex items-center mb-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 text-2xl"
              style={{ backgroundColor: currentFolder.color + '20' }}
            >
              {currentFolder.icon}
            </div>
            <div>
              <h1 
                className="text-3xl font-bold mb-1"
                style={{ color: colors.text.primary }}
              >
                {currentFolder.title}
              </h1>
              <p 
                className="text-lg"
                style={{ color: colors.text.secondary }}
              >
                {currentFolder.description}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {currentFolder.features.map((feature, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: currentFolder.color + '20',
                  color: currentFolder.color
                }}
              >
                ✨ {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 border" style={{ borderColor: colors.border.primary }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium" style={{ color: colors.text.primary }}>
                View:
              </label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {viewOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setView(option.value)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                      view === option.value 
                        ? 'bg-white shadow-sm text-blue-600' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    title={option.label}
                  >
                    {option.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium" style={{ color: colors.text.primary }}>
                  Sort by:
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-1 border rounded text-sm"
                  style={{ borderColor: colors.border.primary }}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium" style={{ color: colors.text.primary }}>
                  Filter:
                </label>
                <input
                  type="text"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  placeholder="Search files..."
                  className="px-3 py-1 border rounded text-sm w-48"
                  style={{ borderColor: colors.border.primary }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Folder Content */}
        <div className="bg-white rounded-lg shadow-sm border" style={{ borderColor: colors.border.primary }}>
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">{currentFolder.icon}</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text.primary }}>
              AI-Enhanced {currentFolder.title} Folder
            </h3>
            <p style={{ color: colors.text.secondary }} className="mb-6">
              Your {folderType} files will appear here with automatic AI analysis, 
              smart tagging, and organization suggestions.
            </p>

            {/* Current Filter/Sort Display */}
            {(filter || sort !== 'name' || view !== 'grid') && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Current settings:</strong>{' '}
                  View: {viewOptions.find(v => v.value === view)?.label}, {' '}
                  Sort: {sortOptions.find(s => s.value === sort)?.label}
                  {filter && `, Filter: "${filter}"`}
                </p>
              </div>
            )}

            {/* File Count and Storage Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: currentFolder.color }}>
                  0
                </div>
                <div className="text-sm" style={{ color: colors.text.secondary }}>
                  Files
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: currentFolder.color }}>
                  0 MB
                </div>
                <div className="text-sm" style={{ color: colors.text.secondary }}>
                  Total Size
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: currentFolder.color }}>
                  0
                </div>
                <div className="text-sm" style={{ color: colors.text.secondary }}>
                  Tags
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            className="bg-white rounded-lg shadow-sm p-4 border text-left hover:shadow-md transition-shadow"
            style={{ borderColor: colors.border.primary }}
          >
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.blue + '20' }}
              >
                <svg className="w-4 h-4" style={{ color: colors.primary.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="font-medium" style={{ color: colors.text.primary }}>
                Upload Files
              </span>
            </div>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Add new files to this folder
            </p>
          </button>

          <button 
            className="bg-white rounded-lg shadow-sm p-4 border text-left hover:shadow-md transition-shadow"
            style={{ borderColor: colors.border.primary }}
          >
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.green + '20' }}
              >
                <svg className="w-4 h-4" style={{ color: colors.primary.green }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-medium" style={{ color: colors.text.primary }}>
                AI Analysis
              </span>
            </div>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Analyze all files in this folder
            </p>
          </button>

          <button 
            className="bg-white rounded-lg shadow-sm p-4 border text-left hover:shadow-md transition-shadow"
            style={{ borderColor: colors.border.primary }}
          >
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.purple + '20' }}
              >
                <svg className="w-4 h-4" style={{ color: colors.primary.purple }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="font-medium" style={{ color: colors.text.primary }}>
                Auto-Organize
              </span>
            </div>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Smart organization suggestions
            </p>
          </button>

          <button 
            className="bg-white rounded-lg shadow-sm p-4 border text-left hover:shadow-md transition-shadow"
            style={{ borderColor: colors.border.primary }}
          >
            <div className="flex items-center mb-2">
              <div 
                className="w-8 h-8 rounded flex items-center justify-center mr-3"
                style={{ backgroundColor: colors.primary.orange + '20' }}
              >
                <svg className="w-4 h-4" style={{ color: colors.primary.orange }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <span className="font-medium" style={{ color: colors.text.primary }}>
                Search
              </span>
            </div>
            <p className="text-sm" style={{ color: colors.text.secondary }}>
              Find files with AI search
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

export default FolderPage;