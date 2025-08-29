import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { colors } from '../lib/design-system';
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import { 
  FolderOpen,
  Image,
  FileText,
  Archive,
  Briefcase,
  BarChart3,
  History,
  Lightbulb,
  Activity,
  Sparkles,
  Brain,
  Tags,
  Search,
  FolderTree,
  Copy,
  FileSearch,
  X
} from 'lucide-react';

interface SmartFolder {
  id: string;
  name: string;
  folder_type: string;
  icon_name: string;
  color_scheme: string;
  file_count: number;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [folders, setFolders] = useState<SmartFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { isMobile } = useMobileNavigation();

  useEffect(() => {
    fetchSmartFolders();
  }, []);

  async function fetchSmartFolders() {
    // For now, use mock data since smart folders table structure might be different
    const mockFolders: SmartFolder[] = [
      {
        id: '1',
        name: 'Documents',
        folder_type: 'documents',
        icon_name: 'smart-folder-documents',
        color_scheme: colors.primary.blue,
        file_count: 0,
        path: '/folders/documents'
      },
      {
        id: '2', 
        name: 'Media Files',
        folder_type: 'media',
        icon_name: 'smart-folder-media', 
        color_scheme: colors.primary.teal,
        file_count: 0,
        path: '/folders/media'
      },
      {
        id: '3',
        name: 'Projects',
        folder_type: 'projects',
        icon_name: 'smart-folder-projects',
        color_scheme: colors.primary.darkBlue,
        file_count: 0,
        path: '/folders/projects'
      },
      {
        id: '4',
        name: 'Archive',
        folder_type: 'archive', 
        icon_name: 'smart-folder-archive',
        color_scheme: colors.primary.gray,
        file_count: 0,
        path: '/folders/archive'
      }
    ];
    
    setFolders(mockFolders);
    setLoading(false);
  }

  const getIconComponent = (iconName: string, color: string) => {
    const iconProps = { size: 20, color };
    
    switch (iconName) {
      case 'smart-folder-documents':
        return <FileText {...iconProps} />;
      case 'smart-folder-media':
        return <Image {...iconProps} />;
      case 'smart-folder-projects':
        return <Briefcase {...iconProps} />;
      case 'smart-folder-archive':
        return <Archive {...iconProps} />;
      default:
        return <FolderOpen {...iconProps} />;
    }
  };

  const navigationSections = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: colors.primary.blue, path: '/' }
  ];

  const aiSections = [
    { id: 'ai-analysis', label: 'AI Analysis', icon: Sparkles, color: '#06B6D4', path: '/ai-analysis' },
    { id: 'smart-organizer', label: 'Smart Organizer', icon: FolderTree, color: '#10B981', path: '/smart-organizer' },
    { id: 'duplicate-detector', label: 'Duplicate Detector', icon: Copy, color: '#F59E0B', path: '/duplicate-detector' },
    { id: 'smart-tagger', label: 'Smart Tagger', icon: Tags, color: '#EF4444', path: '/smart-tagger' }
  ];

  // Common link style function
  const getLinkClassName = (isActive: boolean, variant: 'primary' | 'ai' = 'primary') => {
    const base = 'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left';
    
    if (isActive) {
      if (variant === 'ai') {
        return `${base} bg-purple-50 text-purple-700`;
      }
      return `${base} bg-blue-50 text-blue-700`;
    }
    
    return `${base} hover:bg-gray-50`;
  };

  // Handle mobile close on navigation
  const handleMobileNavigation = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (!isOpen) {
    return (
      <div 
        className="w-16 bg-white border-r h-full flex flex-col py-4"
        data-sidebar
        style={{ borderColor: colors.border.primary }}
      >
        {/* Regular Navigation */}
        {navigationSections.map((section) => {
          const Icon = section.icon;
          const isActive = location.pathname === section.path;
          
          return (
            <NavLink
              key={section.id}
              to={section.path}
              onClick={handleMobileNavigation}
              className={({ isActive }) => `
                p-3 mx-2 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                }
              `}
              title={section.label}
            >
              <Icon 
                size={20} 
                color={isActive ? colors.primary.blue : colors.text.secondary}
              />
            </NavLink>
          );
        })}
        
        {/* Divider */}
        <div className="mx-3 my-2 border-t" style={{ borderColor: colors.border.primary }}></div>
        
        {/* AI Navigation */}
        {aiSections.map((section) => {
          const Icon = section.icon;
          const isActive = location.pathname === section.path;
          
          return (
            <NavLink
              key={section.id}
              to={section.path}
              onClick={handleMobileNavigation}
              className={({ isActive }) => `
                p-3 mx-2 rounded-lg transition-colors ${
                  isActive ? 'bg-purple-50' : 'hover:bg-gray-50'
                }
              `}
              title={section.label}
            >
              <Icon 
                size={20} 
                color={isActive ? section.color : colors.text.secondary}
              />
            </NavLink>
          );
        })}
        
        {/* Divider */}
        <div className="mx-3 my-2 border-t" style={{ borderColor: colors.border.primary }}></div>
        
        {/* Folder Navigation (Icons Only) */}
        {folders.slice(0, 3).map((folder) => {
          const isActive = location.pathname === folder.path;
          
          return (
            <NavLink
              key={folder.id}
              to={folder.path}
              onClick={handleMobileNavigation}
              className={({ isActive }) => `
                p-3 mx-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                }
              `}
              title={folder.name}
            >
              {getIconComponent(folder.icon_name, isActive ? folder.color_scheme : colors.text.secondary)}
            </NavLink>
          );
        })}
      </div>
    );
  }

  return (
    <div 
      className={`
        ${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}
        w-64 bg-white border-r h-full flex flex-col
        ${isMobile ? 'shadow-lg' : ''}
      `}
      style={{ borderColor: colors.border.primary }}
      data-sidebar
    >
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: colors.border.primary }}>
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: colors.primary.blue }}
            >
              <img 
                src="/icons/logo-fileinasnap.png" 
                alt="FileInASnap" 
                className="w-5 h-5 filter brightness-0 invert"
              />
            </div>
            <span className="font-semibold" style={{ color: colors.text.primary }}>
              FileInASnap
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              <X size={20} style={{ color: colors.text.secondary }} />
            </button>
          )}
        </div>
      )}

      {/* Navigation Sections */}
      <div className="p-4">
        <h2 
          className="text-sm font-semibold mb-3"
          style={{ color: colors.text.secondary }}
        >
          Navigation
        </h2>
        <nav className="space-y-1">
          {navigationSections.map((section) => {
            const Icon = section.icon;
            
            return (
              <NavLink
                key={section.id}
                to={section.path}
                onClick={handleMobileNavigation}
                className={({ isActive }) => getLinkClassName(isActive)}
              >
                {({ isActive }) => (
                  <>
                    <Icon 
                      size={18} 
                      color={isActive ? colors.primary.blue : colors.text.secondary}
                    />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: isActive ? colors.primary.blue : colors.text.primary }}
                    >
                      {section.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* AI Tools */}
      <div className="p-4 border-t" style={{ borderColor: colors.border.primary }}>
        <h2 
          className="text-sm font-semibold mb-3 flex items-center"
          style={{ color: colors.text.secondary }}
        >
          <Sparkles size={16} className="mr-1" style={{ color: '#8B5CF6' }} />
          AI Tools
        </h2>
        <nav className="space-y-1">
          {aiSections.map((section) => {
            const Icon = section.icon;
            
            return (
              <NavLink
                key={section.id}
                to={section.path}
                onClick={handleMobileNavigation}
                className={({ isActive }) => getLinkClassName(isActive, 'ai')}
              >
                {({ isActive }) => (
                  <>
                    <Icon 
                      size={18} 
                      color={isActive ? section.color : colors.text.secondary}
                    />
                    <span 
                      className="text-sm font-medium flex items-center"
                      style={{ color: isActive ? section.color : colors.text.primary }}
                    >
                      {section.label}
                      <Sparkles size={12} className="ml-1 opacity-60" />
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Smart Folders */}
      <div className="p-4 border-t" style={{ borderColor: colors.border.primary }}>
        <h2 
          className="text-sm font-semibold mb-3"
          style={{ color: colors.text.secondary }}
        >
          Smart Folders
        </h2>
        
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {folders.map((folder) => {
              const isActive = location.pathname === folder.path;
              
              return (
                <NavLink
                  key={folder.id}
                  to={folder.path}
                  onClick={handleMobileNavigation}
                  className={({ isActive }) => `
                    w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    {getIconComponent(
                      folder.icon_name, 
                      isActive ? folder.color_scheme : colors.text.secondary
                    )}
                    <span 
                      className="text-sm font-medium"
                      style={{ 
                        color: isActive ? folder.color_scheme : colors.text.primary 
                      }}
                    >
                      {folder.name}
                    </span>
                  </div>
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${folder.color_scheme}15`,
                      color: folder.color_scheme
                    }}
                  >
                    {folder.file_count}
                  </span>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t" style={{ borderColor: colors.border.primary }}>
        <div className="text-xs" style={{ color: colors.text.muted }}>
          <p>FileInASnap v1.0</p>
          <p>Intelligent File Management</p>
        </div>
      </div>
    </div>
  );
}