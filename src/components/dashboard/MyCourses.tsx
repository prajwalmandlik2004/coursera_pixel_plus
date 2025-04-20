import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Award, Clock } from 'lucide-react';
import { enrolledCourses } from '../../data/enrolledCoursesData';

const MyCourses: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');
  
  // Filter courses based on active tab and search query
  const filteredCourses = enrolledCourses
    .filter(course => {
      if (activeTab === 'all') return true;
      if (activeTab === 'in-progress') return course.progress < 100;
      if (activeTab === 'completed') return course.progress === 100;
      return true;
    })
    .filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.provider.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Sort courses based on selected order
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOrder === 'recent') {
      return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
    } else if (sortOrder === 'progress') {
      return b.progress - a.progress;
    } else if (sortOrder === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-xl font-semibold mb-6">My Courses</h2>
        
        {/* Search and filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search your courses..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <button className="btn border border-neutral-300 flex items-center gap-2">
                <Filter size={16} />
                <span>Filter</span>
                <ChevronDown size={16} />
              </button>
            </div>
            <select 
              className="border border-neutral-300 rounded-md px-3 py-2 bg-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="recent">Recently Accessed</option>
              <option value="progress">Progress</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-neutral-200 mb-6">
          <div className="flex space-x-8">
            <button 
              className={`pb-3 px-1 ${activeTab === 'all' ? 'text-primary-500 font-medium border-b-2 border-primary-500' : 'text-neutral-600'}`}
              onClick={() => setActiveTab('all')}
            >
              All Courses ({enrolledCourses.length})
            </button>
            <button 
              className={`pb-3 px-1 ${activeTab === 'in-progress' ? 'text-primary-500 font-medium border-b-2 border-primary-500' : 'text-neutral-600'}`}
              onClick={() => setActiveTab('in-progress')}
            >
              In Progress ({enrolledCourses.filter(c => c.progress < 100).length})
            </button>
            <button 
              className={`pb-3 px-1 ${activeTab === 'completed' ? 'text-primary-500 font-medium border-b-2 border-primary-500' : 'text-neutral-600'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed ({enrolledCourses.filter(c => c.progress === 100).length})
            </button>
          </div>
        </div>
        
        {/* Course List */}
        {sortedCourses.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-500">No courses found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedCourses.map((course) => (
              <div key={course.id} className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full md:w-40 h-32 md:h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-medium text-neutral-800 mb-1">{course.title}</h3>
                    <p className="text-sm text-neutral-500 mb-2">
                      {course.provider} • Enrolled: {new Date(course.enrolledOn).toLocaleDateString()}
                    </p>
                    <div className="flex items-center text-xs text-neutral-600 mb-3 flex-wrap gap-2">
                      {course.progress === 100 ? (
                        <span className="flex items-center text-success-500">
                          <Award size={14} className="mr-1" />
                          Completed on {new Date(course.completedOn || '').toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {course.timeLeft} remaining
                        </span>
                      )}
                      <span className="px-2">•</span>
                      <span>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2 mb-1">
                      <div 
                        className={`h-2 rounded-full ${course.progress === 100 ? 'bg-success-500' : 'bg-primary-500'}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-600">{course.progress}% complete</span>
                      {course.progress === 100 && (
                        <a href="#" className="text-primary-500 hover:text-primary-600 text-xs font-medium">
                          View Certificate
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-3 md:w-32">
                    <a 
                      href={`#course/${course.id}`} 
                      className="btn w-full bg-primary-500 text-white hover:bg-primary-600"
                    >
                      {course.progress === 100 ? 'Review' : 'Resume'}
                    </a>
                    <button className="btn w-full border border-neutral-300 text-neutral-700">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;