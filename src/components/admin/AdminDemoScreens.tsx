
import React from 'react';

export interface DemoScreen {
  title: string;
  content: React.ReactNode;
}

export const useDemoScreens = (): DemoScreen[] => {
  return [
    {
      title: "Patient Overview",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-white">
            <span className="text-sm opacity-80">Active Patients</span>
            <span className="font-bold">247</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-500/20 rounded p-2 text-center">
              <div className="text-lg font-bold text-white">89%</div>
              <div className="text-xs text-green-200">On Track</div>
            </div>
            <div className="bg-orange-500/20 rounded p-2 text-center">
              <div className="text-lg font-bold text-white">7</div>
              <div className="text-xs text-orange-200">At Risk</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Care Team Status",
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-white">
              <span className="text-sm">Available Clinicians</span>
              <span className="font-bold">23/28</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="bg-white/10 rounded p-1">
              <div className="text-sm font-bold text-white">12</div>
              <div className="text-xs text-white/60">On Route</div>
            </div>
            <div className="bg-white/10 rounded p-1">
              <div className="text-sm font-bold text-white">8</div>
              <div className="text-xs text-white/60">In Session</div>
            </div>
            <div className="bg-white/10 rounded p-1">
              <div className="text-sm font-bold text-white">3</div>
              <div className="text-xs text-white/60">Standby</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Performance Metrics",
      content: (
        <div className="space-y-3">
          <div className="text-center text-white mb-3">
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-xs opacity-80">Patient Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-white text-sm">
              <span>Response Time</span>
              <span className="font-bold">4.2 min</span>
            </div>
            <div className="flex justify-between text-white text-sm">
              <span>Completion Rate</span>
              <span className="font-bold">98.7%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Revenue Dashboard",
      content: (
        <div className="space-y-3">
          <div className="text-center text-white">
            <div className="text-xl font-bold">$127K</div>
            <div className="text-xs opacity-80">This Month</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-sm font-bold text-white">+12%</div>
              <div className="text-xs text-white/60">vs Last Month</div>
            </div>
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-sm font-bold text-white">$2.1K</div>
              <div className="text-xs text-white/60">Per Patient</div>
            </div>
          </div>
        </div>
      )
    }
  ];
};
