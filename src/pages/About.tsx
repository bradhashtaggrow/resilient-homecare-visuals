import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Users, Target, Award, Heart, TrendingUp, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "10,000+", label: "Patients Served", icon: Heart },
    { number: "500+", label: "Healthcare Professionals", icon: Users },
    { number: "50+", label: "Healthcare Facilities", icon: Globe },
    { number: "98%", label: "Patient Satisfaction", icon: Award }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Board-certified physician with 15+ years in healthcare innovation"
    },
    {
      name: "Michael Chen",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Healthcare technology expert leading digital transformation"
    },
    {
      name: "Dr. Maria Rodriguez",
      role: "Director of Clinical Operations",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Specialist in patient care coordination and quality improvement"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Users className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About Resilient Healthcare
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're transforming healthcare delivery through innovative solutions that bring 
              quality care directly to patients while empowering healthcare professionals 
              with cutting-edge tools and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center p-8 rounded-2xl bg-blue-50">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg">
                To revolutionize healthcare accessibility by bringing hospital-quality care 
                directly to patients' homes while supporting healthcare professionals with 
                innovative technology and comprehensive resources.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-green-50">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg">
                A world where quality healthcare is accessible to everyone, regardless of 
                location or circumstance, powered by technology and delivered with compassion 
                by skilled healthcare professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-sm">
                  <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gray-50">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-4">Compassionate Care</h3>
              <p className="opacity-90">
                Every interaction is guided by empathy, respect, and genuine concern for patient well-being.
              </p>
            </div>
            
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="opacity-90">
                We maintain the highest standards in everything we do, from clinical care to customer service.
              </p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="opacity-90">
                Continuously improving healthcare delivery through technology and creative solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;