import React from 'react';
import { useAccessibleRouting } from '../hooks/useAccessibleRouting';

export const SkipToContent: React.FC = () => {
  const { skipToContent } = useAccessibleRouting();

  return (
    <button
      id="skip-to-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
      onClick={skipToContent}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          skipToContent();
        }
      }}
    >
      Skip to content
    </button>
  );
};

export default SkipToContent;