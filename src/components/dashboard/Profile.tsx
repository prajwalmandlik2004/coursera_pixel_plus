import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Award, BookOpen, Star, Calendar, Edit, Check, X } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    bio: 'Full-stack developer passionate about learning new technologies. Currently focusing on React and Node.js.',
    location: 'San Francisco, CA',
    website: 'example.com',
    interests: ['Web Development', 'Machine Learning', 'UX Design', 'Data Science', 'Mobile Development'],
    skills: [
      { name: 'JavaScript', level: 4 },
      { name: 'React', level: 3 },
      { name: 'Python', level: 3 },
      { name: 'HTML/CSS', level: 5 },
      { name: 'Node.js', level: 2 }
    ]
  });
  
  // Certificate data
  const certificates = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      issuer: 'Coursera',
      issueDate: 'May 2025',
      credential: 'CERT-12345'
    },
    {
      id: 2,
      title: 'React - The Complete Guide',
      issuer: 'Coursera',
      issueDate: 'March 2025',
      credential: 'CERT-67890'
    }
  ];
  
  // Activity data
  const activities = [
    {
      id: 1,
      type: 'completed',
      course: 'JavaScript - The Complete Guide',
      date: '2 days ago'
    },
    {
      id: 2,
      type: 'enrolled',
      course: 'Data Science Specialization',
      date: '1 week ago'
    },
    {
      id: 3,
      type: 'earned',
      course: 'HTML & CSS Mastery',
      date: '2 weeks ago'
    }
  ];
  
  const handleSaveProfile = () => {
    // Would typically save to backend
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    // Reset form and exit edit mode
    setProfile({
      name: user?.name || '',
      bio: 'Full-stack developer passionate about learning new technologies. Currently focusing on React and Node.js.',
      location: 'San Francisco, CA',
      website: 'example.com',
      interests: ['Web Development', 'Machine Learning', 'UX Design', 'Data Science', 'Mobile Development'],
      skills: [
        { name: 'JavaScript', level: 4 },
        { name: 'React', level: 3 },
        { name: 'Python', level: 3 },
        { name: 'HTML/CSS', level: 5 },
        { name: 'Node.js', level: 2 }
      ]
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400"></div>
        <div className="px-6 pb-6">
          <div className="flex justify-between">
            <div className="flex">
              <img 
                src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'} 
                alt={user?.name} 
                className="w-24 h-24 rounded-full border-4 border-white -mt-12 object-cover"
              />
              {isEditing ? (
                <div className="ml-4 mt-2">
                  <input 
                    type="text" 
                    className="input text-xl font-bold h-10 mb-1"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                </div>
              ) : (
                <div className="ml-4 mt-4">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                </div>
              )}
            </div>
            <div className="mt-4">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSaveProfile}
                    className="btn bg-success-500 text-white hover:bg-success-600 flex items-center"
                  >
                    <Check size={16} className="mr-1" /> Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="btn border border-neutral-300 text-neutral-700 flex items-center"
                  >
                    <X size={16} className="mr-1" /> Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn border border-neutral-300 text-neutral-700 flex items-center"
                >
                  <Edit size={16} className="mr-1" /> Edit Profile
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            {isEditing ? (
              <textarea 
                className="input w-full h-24"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
              ></textarea>
            ) : (
              <p className="text-neutral-600">{profile.bio}</p>
            )}
          </div>
          
          <div className="mt-4 flex flex-wrap gap-4">
            {isEditing ? (
              <>
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">Location</label>
                  <input 
                    type="text" 
                    className="input"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-500 mb-1">Website</label>
                  <input 
                    type="text" 
                    className="input"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="text-neutral-600 text-sm">
                  <span className="font-medium">Location:</span> {profile.location}
                </div>
                <div className="text-neutral-600 text-sm">
                  <span className="font-medium">Website:</span> {profile.website}
                </div>
                <div className="text-neutral-600 text-sm">
                  <span className="font-medium">Member since:</span> April 2025
                </div>
              </>
            )}
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Learning Interests</h3>
            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                profile.interests.map((interest, index) => (
                  <div key={index} className="flex items-center bg-neutral-100 rounded-full px-3 py-1">
                    <input 
                      type="text" 
                      className="bg-transparent border-none focus:outline-none w-24 text-sm"
                      value={interest}
                      onChange={(e) => {
                        const newInterests = [...profile.interests];
                        newInterests[index] = e.target.value;
                        setProfile({...profile, interests: newInterests});
                      }}
                    />
                    <button 
                      className="ml-1 text-neutral-400 hover:text-red-500"
                      onClick={() => {
                        const newInterests = profile.interests.filter((_, i) => i !== index);
                        setProfile({...profile, interests: newInterests});
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              ) : (
                profile.interests.map((interest, index) => (
                  <span key={index} className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">
                    {interest}
                  </span>
                ))
              )}
              {isEditing && (
                <button 
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                  onClick={() => setProfile({...profile, interests: [...profile.interests, 'New Interest']})}
                >
                  + Add Interest
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <div className="space-y-4">
          {profile.skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                {isEditing ? (
                  <input 
                    type="text" 
                    className="input w-48"
                    value={skill.name}
                    onChange={(e) => {
                      const newSkills = [...profile.skills];
                      newSkills[index] = {...newSkills[index], name: e.target.value};
                      setProfile({...profile, skills: newSkills});
                    }}
                  />
                ) : (
                  <span className="text-neutral-700">{skill.name}</span>
                )}
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star}
                      className={`${isEditing ? 'cursor-pointer' : 'cursor-default'} ${
                        star <= skill.level ? 'text-yellow-400' : 'text-neutral-300'
                      }`}
                      onClick={() => {
                        if (isEditing) {
                          const newSkills = [...profile.skills];
                          newSkills[index] = {...newSkills[index], level: star};
                          setProfile({...profile, skills: newSkills});
                        }
                      }}
                      disabled={!isEditing}
                    >
                      <Star size={16} fill={star <= skill.level ? 'currentColor' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full" 
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
          {isEditing && (
            <button 
              className="btn border border-primary-300 text-primary-500 hover:bg-primary-50 mt-2"
              onClick={() => setProfile({...profile, skills: [...profile.skills, {name: 'New Skill', level: 1}]})}
            >
              + Add Skill
            </button>
          )}
        </div>
      </div>
      
      {/* Certificates Section */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold mb-4">
          <div className="flex items-center">
            <Award size={20} className="text-primary-500 mr-2" />
            Certificates
          </div>
        </h3>
        <div className="space-y-4">
          {certificates.map(cert => (
            <div key={cert.id} className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-neutral-800">{cert.title}</h4>
                  <p className="text-sm text-neutral-500 mt-1">
                    {cert.issuer} • Issued {cert.issueDate}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    Credential ID: {cert.credential}
                  </p>
                </div>
                <button className="btn border border-neutral-300 text-neutral-700 h-10">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-semibold mb-4">
          <div className="flex items-center">
            <Calendar size={20} className="text-primary-500 mr-2" />
            Recent Activity
          </div>
        </h3>
        <div className="space-y-4">
          {activities.map(activity => (
            <div key={activity.id} className="flex items-start py-3 border-b border-neutral-100 last:border-b-0">
              <div className={`p-2 rounded-full mr-3 ${
                activity.type === 'completed' 
                  ? 'bg-green-100 text-green-600' 
                  : activity.type === 'enrolled' 
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {activity.type === 'completed' ? (
                  <Check size={16} />
                ) : activity.type === 'enrolled' ? (
                  <BookOpen size={16} />
                ) : (
                  <Award size={16} />
                )}
              </div>
              <div>
                <p className="text-neutral-700">
                  {activity.type === 'completed' 
                    ? 'Completed a course:' 
                    : activity.type === 'enrolled' 
                    ? 'Enrolled in a new course:' 
                    : 'Earned a certificate:'}
                  <span className="font-medium"> {activity.course}</span>
                </p>
                <p className="text-xs text-neutral-500 mt-1">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;