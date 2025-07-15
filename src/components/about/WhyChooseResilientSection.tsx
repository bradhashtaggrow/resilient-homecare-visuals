import React from 'react';
import { ArrowRight, TrendingUp, Users, Activity, DollarSign, Calendar, FileText, Heart, Target, Star } from 'lucide-react';

const WhyChooseResilientSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Resilient?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three core pillars that make us the leader in home-based healthcare solutions
          </p>
        </div>

        {/* Two Cards Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* For Hospitals Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  For Hospitals
                </span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Expand Home-Based Care Without Disrupting Workflows
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <TrendingUp className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Reduce readmissions by 25-40% while optimizing care efficiency.
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Users className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Scale hospital-at-home services with on-demand contract clinicians.
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <DollarSign className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Maintain profitability with AI-driven automation that reduces overhead.
                </span>
              </li>
            </ul>

            {/* Decorative image placeholder */}
            <div className="mt-8 h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-blue-600 font-medium">Hospital Technology</p>
              </div>
            </div>
          </div>

          {/* For Clinicians Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  For Clinicians
                </span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              More Flexibility, More Earnings, More Patient Impact
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Calendar className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-gray-700">
                  Work on your schedule—join the home healthcare gig economy.
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <FileText className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-gray-700">
                  RAIN automates scheduling, payments, and records management for a seamless experience.
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Heart className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-gray-700">
                  Deliver high-quality, patient-centered care with less bureaucracy.
                </span>
              </li>
            </ul>

            {/* Decorative image placeholder */}
            <div className="mt-8 h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Users className="w-16 h-16 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-green-600 font-medium">Healthcare Professional</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseResilientSection;