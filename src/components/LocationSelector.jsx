import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

export function LocationSelector({ locations, selectedLocation, onSelect }) {
  if (!locations || locations.length <= 1) return null;

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Location
      </label>
      <div className="relative">
        <select
          value={selectedLocation?.name || ''}
          onChange={(e) => {
            const location = locations.find(l => l.name === e.target.value);
            if (location) onSelect(location);
          }}
          className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {locations.map((location) => (
            <option key={location.name} value={location.name}>
              {location.title || 'Unnamed Location'}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
