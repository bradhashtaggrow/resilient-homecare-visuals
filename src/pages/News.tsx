import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react';

const News = () => {
  const newsArticles = [
    {
      id: 1,
      title: "Revolutionary AI-Powered Diagnostics Launch",
      excerpt: "Our new AI diagnostic platform shows 95% accuracy in early disease detection, revolutionizing preventive healthcare.",
      date: "March 15, 2024",
      author: "Dr. Sarah Johnson",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Expanding Home Care Services to Rural Communities",
      excerpt: "New initiative brings hospital-quality care to underserved rural areas through our mobile healthcare units.",
      date: "March 10, 2024",
      author: "Healthcare Team",
      category: "Community",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Partnership with Leading Medical Research Institute",
      excerpt: "Collaborative research initiative focuses on breakthrough treatments for chronic conditions.",
      date: "March 5, 2024",
      author: "Research Department",
      category: "Research",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Patient Satisfaction Scores Reach All-Time High",
      excerpt: "Latest survey results show 98% patient satisfaction rate across all our healthcare services.",
      date: "February 28, 2024",
      author: "Quality Assurance",
      category: "Patient Care",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <Newspaper className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Healthcare News
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest developments in healthcare innovation, 
              research breakthroughs, and community health initiatives from Resilient Healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white mb-16">
            <div className="max-w-4xl">
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Featured Story
              </span>
              <h2 className="text-4xl font-bold mb-6">
                Breakthrough in Telemedicine Technology
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Our latest telemedicine platform integration has reduced patient wait times by 60% 
                while improving diagnostic accuracy through advanced remote monitoring capabilities.
              </p>
              <button className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Read Full Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Latest News</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {newsArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 hover:text-blue-600 cursor-pointer">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {article.excerpt}
                  </p>
                  
                  <button className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;