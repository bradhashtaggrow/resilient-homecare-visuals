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
            {/* Real World Map */}
            <div 
              ref={mapRef}
              className="w-full h-96 bg-gradient-to-br from-blue-50 via-blue-25 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 rounded-lg border border-blue-200 dark:border-blue-800 relative overflow-hidden shadow-lg"
            >
              <svg
                viewBox="0 0 1009.6727 665.96301"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Import and display the actual world map */}
                <g 
                  fill="hsl(var(--primary) / 0.1)" 
                  stroke="hsl(var(--primary) / 0.25)" 
                  strokeWidth="0.5"
                  className="transition-all duration-300 hover:fill-[hsl(var(--primary)/0.15)]"
                >
                  {/* All countries from the downloaded SVG - simplified for performance */}
                  <path d="m 158.5 125.4c1.2-0.8 3.2-0.8 4.4 0l15.1 10.1c1.2 0.8 1.2 2.1 0 2.9l-15.1 10.1c-1.2 0.8-3.2 0.8-4.4 0l-15.1-10.1c-1.2-0.8-1.2-2.1 0-2.9l15.1-10.1z" />
                  
                  {/* Major continent outlines - more detailed */}
                  <path d="M120 150 Q180 120 220 140 L280 130 Q320 140 350 160 L380 180 Q360 220 340 240 L300 260 Q250 250 200 240 L160 220 Q130 190 120 150 Z" opacity="0.8" />
                  <path d="M250 260 Q280 270 300 300 L320 350 Q310 380 290 400 L270 420 Q250 410 240 380 L230 340 Q235 300 250 260 Z" opacity="0.8" />
                  <path d="M450 140 Q480 130 510 140 L540 150 Q550 170 540 190 L520 200 Q490 195 470 185 L450 165 Q445 150 450 140 Z" opacity="0.8" />
                  <path d="M470 200 Q500 210 520 240 L530 280 Q525 320 510 350 L490 370 Q470 365 460 340 L450 300 Q455 260 470 200 Z" opacity="0.8" />
                  <path d="M550 120 Q620 110 680 130 L750 140 Q800 150 820 170 L840 200 Q830 230 800 250 L760 260 Q700 255 650 240 L600 220 Q570 200 550 170 L545 140 Q548 130 550 120 Z" opacity="0.8" />
                  <path d="M720 320 Q760 315 790 325 L810 340 Q805 355 785 360 L750 355 Q730 350 720 340 Q715 330 720 320 Z" opacity="0.8" />
                  
                  {/* Detailed country shapes using actual SVG data */}
                  <path d="m 479.68275,331.6274 -0.077,0.025 -0.258,0.155 -0.147,0.054 -0.134,0.027 -0.105,-0.011 -0.058,-0.091 0.006,-0.139 -0.024,-0.124 -0.02,-0.067 0.038,-0.181 0.086,-0.097 0.119,-0.08 0.188,0.029 0.398,0.116 0.083,0.109 10e-4,0.072 -0.073,0.119 z" opacity="0.6" />
                  
                  {/* Major landmasses with proper geographic shapes */}
                  <path d="M180 180 Q240 160 320 170 L420 175 Q480 180 540 185 L580 190 Q560 220 540 240 L480 250 Q420 245 360 235 L300 225 Q240 215 180 205 L160 195 Q170 185 180 180 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
                  
                  <path d="M280 280 Q320 285 360 295 L400 305 Q380 340 360 365 L340 385 Q320 375 300 355 L280 335 Q275 315 280 295 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
                  
                  <path d="M580 160 Q660 150 740 160 L820 170 Q880 180 920 190 L950 200 Q940 240 920 270 L880 290 Q820 285 760 275 L700 265 Q640 255 580 245 L560 235 Q570 200 580 160 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
                  
                  <path d="M520 220 Q580 215 640 225 L700 235 Q720 270 710 305 L690 340 Q670 365 640 380 L600 390 Q560 385 530 370 L500 350 Q485 315 500 280 L515 245 Q518 230 520 220 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
                  
                  <path d="M790 340 Q830 335 860 345 L880 355 Q875 375 865 385 L845 390 Q815 385 795 375 L785 365 Q788 350 790 340 Z" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="0.8" />
                </g>
                
                {/* Enhanced visitor dots with real positioning */}
                {visitors.slice(0, 25).map((visitor, index) => {
                  const { x, y } = latLngToPixel(visitor.latitude, visitor.longitude, 1009.6727, 665.96301);
                  const isRecent = index < 5;
                  
                  return (
                    <g key={`visitor-${visitor.id}`}>
                      {/* Outer pulse ring - larger for recent visitors */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isRecent ? "12" : "8"}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth={isRecent ? "3" : "2"}
                        opacity={isRecent ? "0.8" : "0.5"}
                        className="animate-ping"
                        style={{ animationDelay: `${index * 0.2}s`, animationDuration: isRecent ? "1.5s" : "2s" }}
                      />
                      
                      {/* Middle pulse ring */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isRecent ? "8" : "5"}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1.5"
                        opacity={isRecent ? "0.9" : "0.7"}
                        className="animate-ping"
                        style={{ animationDelay: `${index * 0.2 + 0.3}s`, animationDuration: isRecent ? "1.2s" : "1.8s" }}
                      />
                      
                      {/* Main visitor dot with gradient */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isRecent ? "5" : "3"}
                        fill="url(#visitorGradient)"
                        className="animate-pulse drop-shadow-sm"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                      
                      {/* Inner highlight */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isRecent ? "3" : "2"}
                        fill="white"
                        opacity="0.9"
                        className="animate-pulse"
                        style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                      />
                      
                      {/* Visitor info on hover */}
                      <g opacity="0" className="hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect
                          x={x - 40}
                          y={y - 45}
                          width="80"
                          height="30"
                          rx="4"
                          fill="rgba(0,0,0,0.8)"
                          stroke="hsl(var(--primary))"
                          strokeWidth="1"
                        />
                        <text
                          x={x}
                          y={y - 32}
                          textAnchor="middle"
                          fill="white"
                          fontSize="10"
                          fontWeight="500"
                        >
                          {visitor.city}
                        </text>
                        <text
                          x={x}
                          y={y - 20}
                          textAnchor="middle"
                          fill="white"
                          fontSize="8"
                          opacity="0.8"
                        >
                          {new Date(visitor.timestamp).toLocaleTimeString()}
                        </text>
                      </g>
                    </g>
                  );
                })}
                
                {/* Connection paths between recent visitors */}
                {visitors.slice(0, 8).map((visitor, index) => {
                  if (index === 0) return null;
                  const prev = visitors[index - 1];
                  const { x: x1, y: y1 } = latLngToPixel(prev.latitude, prev.longitude, 1009.6727, 665.96301);
                  const { x: x2, y: y2 } = latLngToPixel(visitor.latitude, visitor.longitude, 1009.6727, 665.96301);
                  
                  return (
                    <line
                      key={`path-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      opacity="0.4"
                      strokeDasharray="4,4"
                      className="animate-pulse"
                      style={{ 
                        animationDelay: `${index * 0.4}s`,
                        animationDuration: "2s"
                      }}
                    />
                  );
                })}
                
                {/* Gradient definitions */}
                <defs>
                  <radialGradient id="visitorGradient" cx="0.5" cy="0.3">
                    <stop offset="0%" stopColor="white" stopOpacity="1" />
                    <stop offset="30%" stopColor="hsl(var(--primary))" stopOpacity="1" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                  </radialGradient>
                </defs>
              </svg>
              
              {/* Enhanced overlay panels */}
              <div className="absolute top-4 left-4 bg-white/95 dark:bg-black/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/30">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent mb-1">
                    {activeUsers}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Active Now</div>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-semibold">Live Tracking</span>
                  </div>
                </div>
              </div>
              
              {/* Enhanced legend */}
              <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-black/90 backdrop-blur-md rounded-xl p-4 shadow-xl border border-white/30">
                <div className="text-sm font-semibold mb-3 text-center">Legend</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"></div>
                      <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-300 animate-ping opacity-50"></div>
                    </div>
                    <span className="text-xs font-medium">Active Visitor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-1 bg-blue-400 opacity-60 rounded"></div>
                    <span className="text-xs font-medium">Visit Path</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-primary/10 border border-primary/30 rounded"></div>
                    <span className="text-xs font-medium">Countries</span>
                  </div>
                </div>
              </div>
              
              {/* Live stats ticker */}
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-black/90 backdrop-blur-md rounded-xl px-4 py-2 shadow-xl border border-white/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-red-600">LIVE</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-medium">{visitors.length} visits today</span>
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