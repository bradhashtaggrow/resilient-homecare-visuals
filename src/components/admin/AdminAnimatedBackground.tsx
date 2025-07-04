
import React from 'react';

const AdminAnimatedBackground = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gray-900" />
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-px bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};

export default AdminAnimatedBackground;
