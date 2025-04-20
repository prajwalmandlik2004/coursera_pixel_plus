import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Would handle search in a real implementation
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-500 text-white pt-12 pb-16 md:pt-16 md:pb-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Learn without limits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Start, switch, or advance your career with courses from world-class universities and companies.
            </p>
            
            <div className="bg-white p-2 rounded-lg shadow-lg flex items-center mb-6">
              <Search size={20} className="text-neutral-400 ml-2 mr-1" />
              <form onSubmit={handleSearch} className="flex-grow flex">
                <input
                  type="text"
                  placeholder="What do you want to learn?"
                  className="w-full border-none focus:outline-none text-neutral-800 px-2 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="bg-primary-500 text-white rounded-md px-4 py-2 font-medium"
                >
                  Search
                </button>
              </form>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup" className="btn bg-white text-primary-500 hover:bg-neutral-100 btn-lg">
                Join for Free
              </Link>
              <Link to="#try-coursera-plus" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 btn-lg">
                Try Coursera Plus
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <img 
              src="https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
              alt="Student learning online" 
              className="rounded-lg shadow-xl"
            />
            <div className="absolute top-4 -left-12 bg-white p-4 rounded-lg shadow-lg max-w-xs animate-fadeIn">
              <div className="flex items-center mb-2">
                <img 
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" 
                  alt="Google" 
                  className="w-8 h-8 mr-3"
                />
                <p className="font-medium text-neutral-800">Google</p>
              </div>
              <p className="text-sm font-medium text-neutral-800">Google Data Analytics Certificate</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-neutral-500">Beginner · Certificate</span>
                <Link to="#google-course" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center">
                  View <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="absolute -bottom-10 right-5 bg-white p-4 rounded-lg shadow-lg max-w-xs animate-fadeIn">
              <h4 className="font-bold text-sm text-neutral-800 mb-1">Trusted by:</h4>
              <div className="flex flex-wrap gap-3">
                <img 
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" 
                  alt="Google" 
                  className="w-8 h-8 opacity-90"
                />
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLzLNlXuwFf9jkt1-9fdwWr-T8re6fbTmj0w&s" 
                  alt="University of Michigan" 
                  className="w-8 h-8 opacity-90"
                />
                <img 
                  src="https://img.icons8.com/?size=100&id=31754&format=png&color=000000" 
                  alt="IBM" 
                  className="w-8 h-8 opacity-90"
                />
                <img 
                  src="https://identity.stanford.edu/wp-content/uploads/sites/3/2020/07/block-s-right.png" 
                  alt="Stanford" 
                  className="w-8 h-8 opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;