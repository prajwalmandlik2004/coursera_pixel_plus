import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Search, LogIn, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthWarning(true);
      setTimeout(() => setShowAuthWarning(false), 3000);
    } else {
      navigate('/dashboard');
    }
  };

  const navItems = [
    { 
      name: 'Explore', 
      dropdown: 'explore',
      items: [
        { name: 'Online Degrees', link: '/degrees' },
        { name: 'Certificates', link: '/certificates' },
        { name: 'MasterTrack', link: '/mastertrack' },
        { name: 'Free Courses', link: '/free-courses' }
      ] 
    },
    { 
      name: 'For Business', 
      dropdown: 'business',
      items: [
        { name: 'Coursera for Business', link: '/business' },
        { name: 'Coursera for Teams', link: '/teams' },
        { name: 'Coursera for Campus', link: '/campus' }
      ] 
    },
    { 
      name: 'Universities', 
      dropdown: 'universities',
      items: [
        { name: 'Partner Universities', link: '/universities' },
        { name: 'Become a Partner', link: '/partner' }
      ] 
    }
  ];

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {showAuthWarning && (
        <div className="absolute top-full left-0 right-0 bg-yellow-100 text-yellow-800 px-4 py-2 text-center">
          Please sign in to access the dashboard
        </div>
      )}
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-serif font-bold text-2xl text-primary-500">Coursera</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative" ref={(el) => dropdownRefs.current[item.dropdown] = el}>
              <button 
                className="nav-link flex items-center gap-1"
                onClick={() => toggleDropdown(item.dropdown)}
              >
                {item.name}
                <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.dropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === item.dropdown && (
                <div className="dropdown absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-52">
                  {item.items.map((subItem) => (
                    <Link 
                      key={subItem.name}
                      to={subItem.link} 
                      className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 hover:text-primary-500"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button 
            onClick={handleDashboardClick}
            className="nav-link flex items-center gap-1"
          >
            Dashboard
          </button>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button className="nav-link flex items-center gap-1">
            <Search size={20} />
          </button>
          
          {isAuthenticated ? (
            <div className="relative" ref={(el) => dropdownRefs.current['user'] = el}>
              <button 
                className="flex items-center gap-2"
                onClick={() => toggleDropdown('user')}
              >
                <img 
                  src={user?.avatar || 'https://via.placeholder.com/40'} 
                  alt={user?.name || 'User'} 
                  className="w-8 h-8 rounded-full object-cover"
                />
                <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
              </button>
              
              {activeDropdown === 'user' && (
                <div className="dropdown absolute top-full right-0 mt-1 bg-white shadow-lg rounded-md py-2 min-w-52">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-neutral-500">{user?.email}</p>
                  </div>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 hover:text-primary-500">
                    Dashboard
                  </Link>
                  <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 hover:text-primary-500">
                    Profile
                  </Link>
                  <Link to="/dashboard/settings" className="block px-4 py-2 hover:bg-neutral-50 text-neutral-700 hover:text-primary-500">
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-neutral-50 text-neutral-700 hover:text-error-500"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signin" className="nav-link flex items-center gap-1">
                <LogIn size={20} />
                <span>Sign In</span>
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button 
          className="md:hidden p-2 text-neutral-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`md:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-serif font-bold text-2xl text-primary-500">Coursera</span>
            </Link>
            <button 
              className="p-2 text-neutral-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex items-center mb-6 border rounded-full px-4 py-2">
            <Search size={20} className="text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="ml-2 w-full focus:outline-none"
            />
          </div>

          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-neutral-100 pb-4">
                <button 
                  className="flex items-center justify-between w-full py-2 text-neutral-800 font-medium"
                  onClick={() => toggleDropdown(item.dropdown)}
                >
                  {item.name}
                  <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.dropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {activeDropdown === item.dropdown && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.items.map((subItem) => (
                      <Link 
                        key={subItem.name}
                        to={subItem.link} 
                        className="block py-2 text-neutral-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button 
              onClick={(e) => {
                handleDashboardClick(e);
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-neutral-800 font-medium"
            >
              Dashboard
            </button>
          </nav>

          <div className="mt-auto flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={user?.avatar || 'https://via.placeholder.com/40'} 
                    alt={user?.name || 'User'} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-neutral-500">{user?.email}</p>
                  </div>
                </div>
                <Link 
                  to="/dashboard" 
                  className="block px-4 py-2 text-neutral-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-primary w-full mt-4"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="btn btn-secondary w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;