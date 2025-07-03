
import React from 'react';

const AdminFeaturesGrid = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div className={`text-center transition-all duration-1000 ${
      isVisible ? 'animate-slide-up' : 'opacity-0'
    }`}>
      <p className="text-white/70 text-lg">
        Comprehensive admin dashboard with real-time insights and controls
      </p>
    </div>
  );
};

export default AdminFeaturesGrid;
