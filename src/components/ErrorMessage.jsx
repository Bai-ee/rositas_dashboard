import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export function ErrorMessage({ error, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-800">Error Loading Data</h3>
          <p className="text-red-600 mt-1">{error}</p>

          <div className="mt-4 space-y-2 text-sm text-red-700">
            <p>Common issues:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Google Business Profile API may not be enabled in your Google Cloud project</li>
              <li>Your Google account may not have access to any business profiles</li>
              <li>The OAuth scopes may not be properly configured</li>
            </ul>
          </div>

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
