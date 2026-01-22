import React from 'react';
import { MapPin, Phone, Globe, Clock, Tag } from 'lucide-react';

export function BusinessInfo({ location }) {
  if (!location) return null;

  const formatAddress = (address) => {
    if (!address) return 'No address available';
    const parts = [];
    if (address.addressLines) parts.push(...address.addressLines);
    const cityStateZip = [
      address.locality,
      address.administrativeArea,
      address.postalCode
    ].filter(Boolean).join(', ');
    if (cityStateZip) parts.push(cityStateZip);
    return parts.join('\n') || 'No address available';
  };

  const formatPhoneNumber = (phoneNumbers) => {
    if (!phoneNumbers || !phoneNumbers.primaryPhone) return 'No phone number';
    return phoneNumbers.primaryPhone;
  };

  const formatHours = (regularHours) => {
    if (!regularHours || !regularHours.periods) return [];

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return regularHours.periods.map(period => {
      const day = dayNames[period.openDay === 'SUNDAY' ? 0 :
        period.openDay === 'MONDAY' ? 1 :
          period.openDay === 'TUESDAY' ? 2 :
            period.openDay === 'WEDNESDAY' ? 3 :
              period.openDay === 'THURSDAY' ? 4 :
                period.openDay === 'FRIDAY' ? 5 : 6];

      const formatTime = (time) => {
        if (!time) return '';
        const hours = parseInt(time.hours || 0);
        const minutes = time.minutes || 0;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      };

      return {
        day,
        hours: `${formatTime(period.openTime)} - ${formatTime(period.closeTime)}`
      };
    });
  };

  const hours = formatHours(location.regularHours);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Business Information</h2>
      </div>

      <div className="p-6 space-y-6">
        {/* Business Name */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{location.title || 'Unnamed Location'}</h3>
          {location.categories?.primaryCategory && (
            <div className="flex items-center gap-2 mt-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {location.categories.primaryCategory.displayName}
              </span>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Address</p>
            <p className="text-gray-900 whitespace-pre-line">
              {formatAddress(location.storefrontAddress)}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Phone</p>
            <p className="text-gray-900">{formatPhoneNumber(location.phoneNumbers)}</p>
          </div>
        </div>

        {/* Website */}
        {location.websiteUri && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Website</p>
              <a
                href={location.websiteUri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {location.websiteUri}
              </a>
            </div>
          </div>
        )}

        {/* Hours */}
        {hours.length > 0 && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-700 mb-2">Business Hours</p>
              <div className="space-y-1">
                {hours.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="text-gray-900 font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        {location.profile?.description && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
            <p className="text-gray-600">{location.profile.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
