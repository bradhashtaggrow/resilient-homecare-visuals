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

// Mercator projection functions
const latLngToPixel = (lat: number, lng: number, mapWidth: number, mapHeight: number) => {
  // Convert longitude to x coordinate
  const x = ((lng + 180) / 360) * mapWidth;
  
  // Convert latitude to y coordinate using Mercator projection
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
  const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI));
  
  return { x, y };
};

const LiveVisitorMap: React.FC<LiveVisitorMapProps> = ({ visitors, activeUsers }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    if (mapRef.current) {
      const { offsetWidth } = mapRef.current;
      setMapDimensions({ width: offsetWidth, height: offsetWidth * 0.5 });
    }
  }, []);

  // SVG world map path (simplified world outline)
  const worldMapPath = "M158.5 125.4c1.2-0.8 3.2-0.8 4.4 0l15.1 10.1c1.2 0.8 1.2 2.1 0 2.9l-15.1 10.1c-1.2 0.8-3.2 0.8-4.4 0l-15.1-10.1c-1.2-0.8-1.2-2.1 0-2.9l15.1-10.1zm40 0c1.2-0.8 3.2-0.8 4.4 0l15.1 10.1c1.2 0.8 1.2 2.1 0 2.9l-15.1 10.1c-1.2 0.8-3.2 0.8-4.4 0l-15.1-10.1c-1.2-0.8-1.2-2.1 0-2.9l15.1-10.1z";

  // Generate visitor dots on the map
  const renderVisitorDots = () => {
    return visitors.slice(0, 20).map((visitor, index) => {
      const { x, y } = latLngToPixel(visitor.latitude, visitor.longitude, mapDimensions.width, mapDimensions.height);
      
      return (
        <div
          key={visitor.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{
            left: `${Math.max(10, Math.min(x, mapDimensions.width - 10))}px`,
            top: `${Math.max(10, Math.min(y, mapDimensions.height - 10))}px`,
            animationDelay: `${index * 0.2}s`,
          }}
        >
          {/* Pulsing dot */}
          <div className="relative">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse border-2 border-white shadow-lg"></div>
            <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-0 w-5 h-5 bg-blue-300 rounded-full animate-ping opacity-50 -m-1" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div className="font-medium">{visitor.city}, {visitor.country}</div>
            <div className="text-xs opacity-75">{new Date(visitor.timestamp).toLocaleTimeString()}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </div>
        </div>
      );
    });
  };

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
            {/* SVG World Map */}
            <div 
              ref={mapRef}
              className="w-full h-96 bg-gradient-to-br from-blue-50 via-blue-25 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-800 relative overflow-hidden shadow-lg"
            >
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* World map paths - Simplified continents */}
                <g fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.5">
                  {/* North America */}
                  <path d="M120 150 Q180 120 220 140 L280 130 Q320 140 350 160 L380 180 Q360 220 340 240 L300 260 Q250 250 200 240 L160 220 Q130 190 120 150 Z" />
                  
                  {/* South America */}
                  <path d="M250 260 Q280 270 300 300 L320 350 Q310 380 290 400 L270 420 Q250 410 240 380 L230 340 Q235 300 250 260 Z" />
                  
                  {/* Europe */}
                  <path d="M450 140 Q480 130 510 140 L540 150 Q550 170 540 190 L520 200 Q490 195 470 185 L450 165 Q445 150 450 140 Z" />
                  
                  {/* Africa */}
                  <path d="M470 200 Q500 210 520 240 L530 280 Q525 320 510 350 L490 370 Q470 365 460 340 L450 300 Q455 260 470 200 Z" />
                  
                  {/* Asia */}
                  <path d="M550 120 Q620 110 680 130 L750 140 Q800 150 820 170 L840 200 Q830 230 800 250 L760 260 Q700 255 650 240 L600 220 Q570 200 550 170 L545 140 Q548 130 550 120 Z" />
                  
                  {/* Australia */}
                  <path d="M720 320 Q760 315 790 325 L810 340 Q805 355 785 360 L750 355 Q730 350 720 340 Q715 330 720 320 Z" />
                </g>
                
                {/* Visitor dots */}
                {renderVisitorDots().map((dot, index) => {
                  const { x, y } = latLngToPixel(visitors[index]?.latitude || 0, visitors[index]?.longitude || 0, 1000, 500);
                  return (
                    <g key={`dot-${index}`}>
                      {/* Outer pulse ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        opacity="0.6"
                        className="animate-ping"
                        style={{ animationDelay: `${index * 0.3}s` }}
                      />
                      {/* Inner pulse ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                        opacity="0.8"
                        className="animate-ping"
                        style={{ animationDelay: `${index * 0.3 + 0.2}s` }}
                      />
                      {/* Main dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r="3"
                        fill="hsl(var(--primary))"
                        className="animate-pulse"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                      {/* Glow effect */}
                      <circle
                        cx={x}
                        cy={y}
                        r="2"
                        fill="white"
                        opacity="0.8"
                        className="animate-pulse"
                        style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
                      />
                    </g>
                  );
                })}
                
                {/* Connection lines between recent visitors */}
                {visitors.slice(0, 5).map((visitor, index) => {
                  if (index === 0) return null;
                  const prev = visitors[index - 1];
                  const { x: x1, y: y1 } = latLngToPixel(prev.latitude, prev.longitude, 1000, 500);
                  const { x: x2, y: y2 } = latLngToPixel(visitor.latitude, visitor.longitude, 1000, 500);
                  
                  return (
                    <line
                      key={`connection-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      opacity="0.3"
                      strokeDasharray="3,3"
                      className="animate-pulse"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    />
                  );
                })}
              </svg>
              
              {/* Overlay info panel */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-1">
                    {activeUsers}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">Active Now</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Live</span>
                  </div>
                </div>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
                <div className="text-xs font-medium mb-2">Legend</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    <span className="text-xs">Active Visitor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-1 bg-blue-400 opacity-50"></div>
                    <span className="text-xs">Visit Path</span>
                  </div>
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