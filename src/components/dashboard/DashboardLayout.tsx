import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Award, 
  Settings, 
  User, 
  Menu, 
  X, 
  ChevronRight,
  Bot
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  
  const sidebarLinks = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <BookOpen size={20} />, label: 'My Courses', path: '/dashboard/courses' },
    { icon: <Bot size={20} />, label: 'AI Assistant', path: '/dashboard/ai-assistant' },
    { icon: <Calendar size={20} />, label: 'Goal Planner', path: '/dashboard/goals' },
    { icon: <User size={20} />, label: 'Profile', path: '/dashboard/profile' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the current page title based on the path
  const getCurrentPageTitle = () => {
    const currentLink = sidebarLinks.find(link => 
      location.pathname === link.path || 
      (link.path !== '/dashboard' && location.pathname.startsWith(link.path))
    );
    return currentLink?.label || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <aside 
        className={`bg-white border-r border-neutral-200 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } hidden md:flex md:flex-col`}
      >
        <div className={`p-4 flex ${isSidebarOpen ? 'justify-between' : 'justify-center'} items-center border-b border-neutral-200`}>
          {isSidebarOpen ? (
            <Link to="/" className="font-serif font-bold text-xl text-primary-500">Coursera</Link>
          ) : (
            <Link to="/" className="font-serif font-bold text-xl text-primary-500">C</Link>
          )}
          <button 
            onClick={toggleSidebar}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <ChevronRight size={20} className={`transform transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
          </button>
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/dashboard'}
                className={({ isActive }) => 
                  `flex items-center px-3 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-neutral-600 hover:bg-neutral-100'
                  } ${isSidebarOpen ? 'justify-start' : 'justify-center'}`
                }
              >
                <span className="flex-shrink-0">{link.icon}</span>
                {isSidebarOpen && <span className="ml-3 font-medium">{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>
        
        {isSidebarOpen && (
          <div className="p-4 border-t border-neutral-200">
            <div className="flex items-center">
              <img 
                src={user?.avatar || 'https://via.placeholder.com/40'} 
                alt={user?.name || 'User'} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-neutral-500 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 bg-neutral-800 bg-opacity-50 z-20 md:hidden transition-opacity duration-300 ${
        isMobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMobileSidebarOpen(false)}></div>
      
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 flex justify-between items-center border-b border-neutral-200">
          <Link to="/" className="font-serif font-bold text-xl text-primary-500">Coursera</Link>
          <button 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="px-4 space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/dashboard'}
                className={({ isActive }) => 
                  `flex items-center px-3 py-3 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`
                }
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <span className="flex-shrink-0">{link.icon}</span>
                <span className="ml-3 font-medium">{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center">
            <img 
              src={user?.avatar || 'https://via.placeholder.com/40'} 
              alt={user?.name || 'User'} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-neutral-200 shadow-sm">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-4 text-neutral-500 hover:text-neutral-700"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-neutral-800">
                {getCurrentPageTitle()}
              </h1>
            </div>
            <div className="flex items-center">
              <Link to="/dashboard/ai-assistant" className="mr-4 text-neutral-500 hover:text-primary-500">
                <Bot size={20} />
              </Link>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-neutral-50 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;