import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Stethoscope, GraduationCap, Award, Users, BookOpen, TrendingUp } from 'lucide-react';

const Clinicians = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Stethoscope className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              For Clinicians
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network of healthcare professionals and advance your career while 
              providing exceptional care. Access cutting-edge tools, continuous education, 
              and a supportive community of medical experts.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Team?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Continuous Learning</h3>
              <p className="text-gray-600">
                Access to the latest medical research, training programs, and certification courses.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Career Growth</h3>
              <p className="text-gray-600">
                Clear advancement pathways with leadership development and specialization opportunities.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gray-50">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Collaborative Care</h3>
              <p className="text-gray-600">
                Work with multidisciplinary teams in a supportive, innovative healthcare environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Clinician Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Clinical Guidelines</h3>
              <p className="text-gray-600 mb-4">
                Evidence-based protocols and best practices for optimal patient outcomes.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Treatment protocols</li>
                <li>• Safety guidelines</li>
                <li>• Quality metrics</li>
                <li>• Documentation standards</li>
              </ul>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Performance Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Real-time insights into patient outcomes and care quality metrics.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Patient satisfaction scores</li>
                <li>• Clinical outcome data</li>
                <li>• Efficiency metrics</li>
                <li>• Peer benchmarking</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clinicians;