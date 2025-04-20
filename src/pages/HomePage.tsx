import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle, Star, Trophy, Users, ChevronDown, ChevronUp } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import CourseCard from '../components/courses/CourseCard';
import { courseData } from '../data/courseData';
import { partnerLogos } from '../data/partnerData';
import TestimonialCard from '../components/home/TestimonialCard';
import { testimonials } from '../data/testimonialData';
import FAQ from '../components/home/FAQ';
import { faqs } from '../data/faqData';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />

      {/* Partners Section */}
      <section className="py-10 bg-neutral-50">
        <div className="container">
          <h2 className="text-center text-xl md:text-2xl font-medium mb-8 text-neutral-700">
            Trusted by over 12,000 companies and millions of learners around the world
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partnerLogos.map((logo, index) => (
              <img 
                key={index} 
                src={logo.url} 
                alt={logo.name} 
                className="h-6 md:h-8 lg:h-10 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-3">World-class courses for anyone, anywhere</h2>
              <p className="text-neutral-600 max-w-xl">
                Find courses taught by experts from top universities and companies to help you gain the skills you need to succeed.
              </p>
            </div>
            <Link to="/catalog" className="mt-4 md:mt-0 flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors">
              Explore all courses <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>

          {/* Tabs */}
          <div className="mb-8 border-b border-neutral-200">
            <div className="flex space-x-8 overflow-x-auto pb-2">
              <button className="text-primary-500 font-medium border-b-2 border-primary-500 pb-3 px-1 whitespace-nowrap">
                Most Popular
              </button>
              <button className="text-neutral-600 font-medium hover:text-primary-500 pb-3 px-1 whitespace-nowrap">
                New & Trending
              </button>
              <button className="text-neutral-600 font-medium hover:text-primary-500 pb-3 px-1 whitespace-nowrap">
                Data Science
              </button>
              <button className="text-neutral-600 font-medium hover:text-primary-500 pb-3 px-1 whitespace-nowrap">
                Business
              </button>
              <button className="text-neutral-600 font-medium hover:text-primary-500 pb-3 px-1 whitespace-nowrap">
                Computer Science
              </button>
              <button className="text-neutral-600 font-medium hover:text-primary-500 pb-3 px-1 whitespace-nowrap">
                Health
              </button>
            </div>
          </div>

          {/* Course Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courseData.slice(0, 8).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/catalog" className="btn btn-lg btn-primary">
              Explore all courses
            </Link>
          </div>
        </div>
      </section>

      {/* Degree Programs */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Earn your degree from world-class universities</h2>
              <p className="text-neutral-600 mb-6">
                Complete your bachelor's or master's degree entirely online with Coursera. Our degrees are offered through our university partners, making it possible to earn a prestigious degree at a breakthrough price.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-success-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Earn an accredited bachelor's or master's degree</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-success-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Study on a flexible schedule from anywhere</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-success-500 mt-1 mr-3 flex-shrink-0" />
                  <span>Pay a fraction of the cost of a traditional degree</span>
                </li>
              </ul>
              
              <Link to="#degrees" className="btn btn-lg btn-primary">
                Explore Degrees
              </Link>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8199164/pexels-photo-8199164.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Students graduating" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
                <div className="flex items-center mb-2">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSarqQSPAUiBeSd1lKz65W346MgCLavqoMPlA&s" 
                    alt="University Logo" 
                    className="w-10 h-10 mr-3"
                  />
                  <div>
                    <h4 className="text-sm font-medium">University of Illinois</h4>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <Star size={14} className="text-yellow-400 fill-current" />
                      <span className="text-xs ml-1 text-neutral-600">(4,721)</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium">Master of Computer Science in Data Science</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">What our learners are saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Coursera */}
      <section className="py-16 bg-primary-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Why learn with Coursera</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-card">
              <Trophy size={40} className="text-primary-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Earn credentials from top universities</h3>
              <p className="text-neutral-600">
                Learn from world-class universities and companies, and earn credentials recognized by employers.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-card">
              <Users size={40} className="text-primary-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Learn with a global community</h3>
              <p className="text-neutral-600">
                Join millions of learners from around the world who are mastering new skills and advancing their careers.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-card">
              <Search size={40} className="text-primary-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Find the right course for you</h3>
              <p className="text-neutral-600">
                Choose from 11,000+ courses and learning programs across business, technology, science, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Flexible pricing options to meet your learning needs</h2>
            <p className="text-neutral-600">
              Whether you want to learn a single course or gain access to our entire catalog, Coursera has a plan for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border border-neutral-200 rounded-lg p-8 hover:shadow-card-hover transition-shadow">
              <h3 className="text-xl font-bold mb-2">Free Courses</h3>
              <p className="text-3xl font-bold mb-6">$0</p>
              <p className="text-neutral-600 mb-6">Access to free courses and content</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Join 115+ million learners</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Access 2,000+ free courses</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Learn from top institutions</span>
                </li>
              </ul>
              
              <Link to="#signup" className="btn btn-secondary w-full">
                Sign Up for Free
              </Link>
            </div>
            
            {/* Course Certificates */}
            <div className="border border-neutral-200 rounded-lg p-8 hover:shadow-card-hover transition-shadow">
              <h3 className="text-xl font-bold mb-2">Course Certificates</h3>
              <p className="text-3xl font-bold mb-6">$49+</p>
              <p className="text-neutral-600 mb-6">Per course certificate</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Earn shareable certificates</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Complete hands-on projects</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-success-500 mt-1 mr-2 flex-shrink-0" />
                  <span>Get instructor feedback</span>
                </li>
              </ul>
              
              <Link to="#find-courses" className="btn btn-secondary w-full">
                Find Courses
              </Link>
            </div>
            
            {/* Coursera Plus */}
            <div className="bg-primary-500 text-white rounded-lg p-8 relative overflow-hidden shadow-lg transform transition-transform hover:scale-105">
              <div className="absolute top-0 right-0 bg-secondary-500 text-xs font-bold px-3 py-1 uppercase">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Coursera Plus</h3>
              <p className="text-3xl font-bold mb-1">$59</p>
              <p className="text-sm mb-6">per month, cancel anytime</p>
              <p className="text-white/90 mb-6">Access 7,000+ courses, specializations, and professional certificates</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-white mt-1 mr-2 flex-shrink-0" />
                  <span>Unlimited certificates</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-white mt-1 mr-2 flex-shrink-0" />
                  <span>7,000+ courses and projects</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-white mt-1 mr-2 flex-shrink-0" />
                  <span>Professional certificates</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle size={16} className="text-white mt-1 mr-2 flex-shrink-0" />
                  <span>14-day money-back guarantee</span>
                </li>
              </ul>
              
              <Link to="#coursera-plus" className="btn bg-white text-primary-500 hover:bg-neutral-100 w-full font-medium">
                Start 7-Day Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <FAQ key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
            
            <div className="text-center mt-10">
              <Link to="#help-center" className="btn btn-secondary">
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start learning with Coursera today</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join millions of learners from around the world who are mastering new skills, advancing their careers, and exploring new hobbies on Coursera.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="btn bg-white text-primary-500 hover:bg-neutral-100 btn-lg">
              Join for Free
            </Link>
            <Link to="#find-degrees" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 btn-lg">
              Find Your Degree
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;