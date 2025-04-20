import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Award } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  provider: {
    name: string;
    logo: string;
  };
  image: string;
  level: string;
  rating: number;
  reviewCount: number;
  students: number;
  duration: string;
  skills: string[];
  certificate: boolean;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`#course/${course.id}`} className="card group transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium">
          {course.level}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={course.provider.logo} 
            alt={course.provider.name} 
            className="w-8 h-8 mr-2"
          />
          <span className="text-sm text-neutral-700">{course.provider.name}</span>
        </div>
        
        <h3 className="font-medium mb-2 text-neutral-800 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {course.title}
        </h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center mr-3">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{course.rating.toFixed(1)}</span>
            <span className="ml-1 text-xs text-neutral-500">({course.reviewCount.toLocaleString()})</span>
          </div>
          <div className="text-xs text-neutral-500">
            {course.students.toLocaleString()} students
          </div>
        </div>
        
        <div className="flex items-center text-xs text-neutral-600 mb-3">
          <Clock size={14} className="mr-1" />
          <span>{course.duration}</span>
          
          {course.certificate && (
            <>
              <span className="mx-2">•</span>
              <Award size={14} className="mr-1" />
              <span>Certificate</span>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {course.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs">
              {skill}
            </span>
          ))}
          {course.skills.length > 3 && (
            <span className="bg-neutral-100 text-neutral-700 px-2 py-1 rounded text-xs">
              +{course.skills.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;