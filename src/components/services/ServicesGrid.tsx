
import React from 'react';
import ServiceCard from './ServiceCard';
import { LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  patient_image_url: string;
}

interface ServicesGridProps {
  services: Service[];
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="space-y-16">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              {...service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
