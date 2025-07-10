import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Globe, Wifi } from 'lucide-react';

interface VisitorLocation {
  id: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  page_url: string;
  device_type: string;
  browser: string;
}

interface LiveVisitorMapProps {
  visitors: VisitorLocation[];
  activeUsers: number;
}

const LiveVisitorMap: React.FC<LiveVisitorMapProps> = ({ visitors, activeUsers }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxToken] = useState('pk.eyJ1IjoidGVzdC11c2VyIiwiYSI6ImNsbTBkZmN2czAwNGsza3BrbXdmemkxaG8ifQ.placeholder'); // You'll need to add this to Supabase secrets

  // Create a visual map representation using CSS and divs (alternative to actual Mapbox)
  const renderVisualMap = () => {
    const countryVisitors = visitors.reduce((acc, visitor) => {
      const key = visitor.country;
      if (!acc[key]) {
        acc[key] = { count: 0, cities: new Set(), latest: visitor.timestamp };
      }
      acc[key].count++;
      acc[key].cities.add(visitor.city);
      if (new Date(visitor.timestamp) > new Date(acc[key].latest)) {
        acc[key].latest = visitor.timestamp;
      }
      return acc;
    }, {} as Record<string, { count: number; cities: Set<string>; latest: string }>);

    return Object.entries(countryVisitors)
      .sort(([,a], [,b]) => b.count - a.count)
      .slice(0, 10);
  };

  const topCountries = renderVisualMap();

  // Real-time ping animation for active users
  const renderActivePings = () => {
    return visitors.slice(0, 5).map((visitor, index) => (
      <div
        key={visitor.id}
        className="absolute"
        style={{
          left: `${20 + (index * 15)}%`,
          top: `${30 + (index * 10)}%`,
        }}
      >
        <div className="relative">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {visitor.city}, {visitor.country}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* World Map Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Live Visitor Map
            <Badge variant="secondary" className="ml-auto flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {activeUsers} active now
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* World Map Background */}
            <div 
              ref={mapRef}
              className="w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg border-2 border-dashed border-blue-200 dark:border-blue-800 flex items-center justify-center relative overflow-hidden group"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath d='M150 200Q200 150 300 180T500 200Q600 220 700 200T900 220L950 250Q900 280 800 260T600 240Q500 220 400 240T200 260L150 200Z' fill='hsl(var(--primary) / 0.1)'/%3E%3Cpath d='M100 300Q150 250 250 280T450 300Q550 320 650 300T850 320L900 350Q850 380 750 360T550 340Q450 320 350 340T150 360L100 300Z' fill='hsl(var(--secondary) / 0.1)'/%3E%3C/svg%3E")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Active visitor pings */}
              <div className="absolute inset-0">
                {renderActivePings()}
              </div>
              
              {/* Center info */}
              <div className="text-center z-10">
                <div className="text-4xl font-bold text-primary mb-2">{activeUsers}</div>
                <div className="text-sm text-muted-foreground">Active Visitors Right Now</div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Wifi className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Live Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Country/City Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Top Countries (Real-time)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map(([country, data], index) => (
                <div key={country} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{country}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.cities.size} {data.cities.size === 1 ? 'city' : 'cities'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{data.count}</p>
                    <p className="text-xs text-muted-foreground">visitors</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Visitors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Latest Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {visitors.slice(0, 8).map((visitor) => (
                <div key={visitor.id} className="flex items-center justify-between p-2 border rounded hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <div>
                      <p className="font-medium text-sm">{visitor.city}, {visitor.country}</p>
                      <p className="text-xs text-muted-foreground">{visitor.page_url}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(visitor.timestamp).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{visitor.device_type}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{visitors.length}</div>
              <div className="text-sm text-muted-foreground">Total Visits Today</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{new Set(visitors.map(v => v.country)).size}</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{new Set(visitors.map(v => v.city)).size}</div>
              <div className="text-sm text-muted-foreground">Cities</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((visitors.filter(v => v.device_type === 'mobile').length / visitors.length) * 100) || 0}%
              </div>
              <div className="text-sm text-muted-foreground">Mobile Users</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveVisitorMap;