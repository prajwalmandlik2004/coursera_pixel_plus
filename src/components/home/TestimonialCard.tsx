import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  course: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition-shadow">
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold text-neutral-800">{testimonial.name}</h3>
          <p className="text-sm text-neutral-500">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={16} 
            className={`${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'} mr-1`}
          />
        ))}
      </div>
      
      <p className="text-neutral-600 mb-4 line-clamp-4">{testimonial.content}</p>
      
      <p className="text-sm text-neutral-500 italic">
        On: <span className="font-medium text-neutral-700">{testimonial.course}</span>
      </p>
    </div>
  );
};

export default TestimonialCard;