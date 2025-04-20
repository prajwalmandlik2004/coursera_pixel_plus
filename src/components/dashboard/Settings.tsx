import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Bell, Mail, Lock, LogOut, Globe, Moon, User } from 'lucide-react';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('account');
  const [accountSettings, setAccountSettings] = useState({
    name: user?.name || '',
    email: user?.email || '',
    language: 'English',
    timezone: 'Pacific Time (US & Canada)',
    darkMode: false,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    newCoursesRecommendations: true,
    learningReminders: true,
    marketingEmails: false,
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleAccountSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Would typically save to backend
    setSuccessMessage('Account settings updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  const handleNotificationSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Would typically save to backend
    setSuccessMessage('Notification settings updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // Would typically save to backend
    setSuccessMessage('Password updated successfully');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setError('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6 animate-fadeIn">
          {successMessage}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-neutral-50 md:border-r border-neutral-200">
            <nav className="p-4">
              <div className="space-y-1">
                <button 
                  className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                    activeTab === 'account' 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('account')}
                >
                  <User size={18} className="mr-3" />
                  <span>Account Settings</span>
                </button>
                <button 
                  className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                    activeTab === 'notifications' 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={18} className="mr-3" />
                  <span>Notifications</span>
                </button>
                <button 
                  className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                    activeTab === 'password' 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  onClick={() => setActiveTab('password')}
                >
                  <Lock size={18} className="mr-3" />
                  <span>Password & Security</span>
                </button>
                <hr className="my-3 border-neutral-200" />
                <button 
                  className="flex items-center w-full px-3 py-2 rounded-md text-left text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-3" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
          
          {/* Content Area */}
          <div className="flex-1 p-6">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <form onSubmit={handleAccountSave}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="input"
                        value={accountSettings.name}
                        onChange={(e) => setAccountSettings({...accountSettings, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="input"
                        value={accountSettings.email}
                        onChange={(e) => setAccountSettings({...accountSettings, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-neutral-700 mb-1">
                        Language
                      </label>
                      <div className="flex items-center">
                        <Globe size={18} className="text-neutral-500 mr-2" />
                        <select
                          id="language"
                          className="input"
                          value={accountSettings.language}
                          onChange={(e) => setAccountSettings({...accountSettings, language: e.target.value})}
                        >
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Chinese</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-neutral-700 mb-1">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        className="input"
                        value={accountSettings.timezone}
                        onChange={(e) => setAccountSettings({...accountSettings, timezone: e.target.value})}
                      >
                        <option>Pacific Time (US & Canada)</option>
                        <option>Mountain Time (US & Canada)</option>
                        <option>Central Time (US & Canada)</option>
                        <option>Eastern Time (US & Canada)</option>
                        <option>UTC</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <Moon size={18} className="text-neutral-500 mr-2" />
                      <label htmlFor="darkMode" className="text-sm font-medium text-neutral-700 mr-3">
                        Dark Mode
                      </label>
                      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                        <input
                          type="checkbox"
                          name="darkMode"
                          id="darkMode"
                          className="sr-only"
                          checked={accountSettings.darkMode}
                          onChange={(e) => setAccountSettings({...accountSettings, darkMode: e.target.checked})}
                        />
                        <div className="block h-6 bg-neutral-200 rounded-full"></div>
                        <div 
                          className={`absolute left-0 top-0 mt-1 ml-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out transform ${
                            accountSettings.darkMode ? 'translate-x-4' : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            )}
            
            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                <form onSubmit={handleNotificationSave}>
                  <div className="space-y-6 mb-6">
                    <div>
                      <div className="flex items-center mb-4">
                        <input
                          id="emailNotifications"
                          type="checkbox"
                          className="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                        />
                        <label htmlFor="emailNotifications" className="ml-2 block text-sm font-medium text-neutral-700">
                          Enable email notifications
                        </label>
                      </div>
                      <div className="pl-6 space-y-4 border-l border-neutral-200 ml-2">
                        <div className="flex items-center">
                          <input
                            id="courseUpdates"
                            type="checkbox"
                            className="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                            checked={notificationSettings.courseUpdates}
                            onChange={(e) => setNotificationSettings({...notificationSettings, courseUpdates: e.target.checked})}
                            disabled={!notificationSettings.emailNotifications}
                          />
                          <label htmlFor="courseUpdates" className="ml-2 block text-sm text-neutral-700">
                            Course updates and announcements
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="newCoursesRecommendations"
                            type="checkbox"
                            className="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                            checked={notificationSettings.newCoursesRecommendations}
                            onChange={(e) => setNotificationSettings({...notificationSettings, newCoursesRecommendations: e.target.checked})}
                            disabled={!notificationSettings.emailNotifications}
                          />
                          <label htmlFor="newCoursesRecommendations" className="ml-2 block text-sm text-neutral-700">
                            New course recommendations
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="learningReminders"
                            type="checkbox"
                            className="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                            checked={notificationSettings.learningReminders}
                            onChange={(e) => setNotificationSettings({...notificationSettings, learningReminders: e.target.checked})}
                            disabled={!notificationSettings.emailNotifications}
                          />
                          <label htmlFor="learningReminders" className="ml-2 block text-sm text-neutral-700">
                            Learning reminders and progress updates
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="marketingEmails"
                            type="checkbox"
                            className="h-4 w-4 text-primary-500 border-neutral-300 rounded focus:ring-primary-500"
                            checked={notificationSettings.marketingEmails}
                            onChange={(e) => setNotificationSettings({...notificationSettings, marketingEmails: e.target.checked})}
                            disabled={!notificationSettings.emailNotifications}
                          />
                          <label htmlFor="marketingEmails" className="ml-2 block text-sm text-neutral-700">
                            Marketing emails and special offers
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Notification Settings
                  </button>
                </form>
              </div>
            )}
            
            {/* Password Settings */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Password & Security</h2>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                  </div>
                )}
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        className="input"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        className="input"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      />
                      <p className="mt-1 text-sm text-neutral-500">
                        Password must be at least 8 characters
                      </p>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className="input"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                  >
                    Update Password
                  </button>
                </form>
                
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <h3 className="text-lg font-medium mb-4">Account Security</h3>
                  <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                    <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-neutral-600 mb-3">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button className="btn bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
                      Enable 2FA
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-700 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-600 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="btn bg-white border border-red-500 text-red-600 hover:bg-red-50">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;