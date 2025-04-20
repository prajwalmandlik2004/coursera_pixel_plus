import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  CheckCircle,
  Trophy
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { enrolledCourses } from '../../data/enrolledCoursesData';

const DashboardHome: React.FC = () => {
  // Activity data for the chart
  const activityData = [
    { name: 'Mon', minutes: 45 },
    { name: 'Tue', minutes: 30 },
    { name: 'Wed', minutes: 60 },
    { name: 'Thu', minutes: 90 },
    { name: 'Fri', minutes: 25 },
    { name: 'Sat', minutes: 120 },
    { name: 'Sun', minutes: 75 },
  ];

  // Progress data for pie chart
  const progressData = [
    { name: 'Completed', value: 3 },
    { name: 'In Progress', value: 2 },
    { name: 'Not Started', value: 1 },
  ];

  const COLORS = ['#00897B', '#0056D2', '#D5DADE'];

  // Calculated stats
  const totalTimeSpent = activityData.reduce((sum, day) => sum + day.minutes, 0);
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(course => course.progress === 100).length;

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-500 text-sm font-medium">Total Learning Time</p>
              <p className="text-2xl font-bold mt-1 text-neutral-800">
                {Math.floor(totalTimeSpent / 60)} hrs {totalTimeSpent % 60} mins
              </p>
              <p className="text-xs text-success-500 mt-1 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                <span>+12% from last week</span>
              </p>
            </div>
            <div className="bg-primary-50 p-2 rounded-lg">
              <Clock size={24} className="text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-500 text-sm font-medium">Courses In Progress</p>
              <p className="text-2xl font-bold mt-1 text-neutral-800">
                {totalCourses - completedCourses} / {totalCourses}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {completedCourses} completed courses
              </p>
            </div>
            <div className="bg-primary-50 p-2 rounded-lg">
              <BookOpen size={24} className="text-primary-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-neutral-500 text-sm font-medium">Certificates Earned</p>
              <p className="text-2xl font-bold mt-1 text-neutral-800">
                {completedCourses}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {totalCourses - completedCourses} pending
              </p>
            </div>
            <div className="bg-primary-50 p-2 rounded-lg">
              <Award size={24} className="text-primary-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Weekly Learning Activity</h2>
            <select className="text-sm border border-neutral-300 rounded-md p-1">
              <option>This Week</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={activityData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}m`}
                />
                <Tooltip 
                  formatter={(value) => [`${value} minutes`, 'Learning time']}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />
                <Bar
                  dataKey="minutes"
                  fill="#0056D2"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-lg font-semibold mb-6">Course Progress</h2>
          <div className="h-48 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  labelLine={false}
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} courses`, name]}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {progressData.map((entry, index) => (
              <div key={index} className="flex items-center text-sm">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-neutral-700">{entry.name}</span>
                <span className="ml-auto font-medium">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Courses In Progress */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Courses In Progress</h2>
          <Link 
            to="/dashboard/courses" 
            className="text-primary-500 text-sm font-medium hover:text-primary-600"
          >
            View All
          </Link>
        </div>
        <div className="space-y-4">
          {enrolledCourses.slice(0, 3).map((course) => (
            <div key={course.id} className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
              <div className="flex items-start gap-4">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-neutral-800 mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-neutral-500 mb-2">
                    {course.provider} • {course.progress === 100 ? 'Completed' : 'In Progress'}
                  </p>
                  <div className="w-full bg-neutral-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-600">{course.progress}% complete</span>
                    <span className="text-neutral-600">{course.timeLeft}</span>
                  </div>
                </div>
                <Link 
                  to={`#course/${course.id}`} 
                  className="btn bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm flex-shrink-0"
                >
                  Resume
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Promo */}
      <div className="bg-primary-500 text-white rounded-lg shadow-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <Trophy size={180} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">AI Learning Assistant</h2>
            <p className="text-white/90 mb-4 max-w-xl">
              Get personalized learning recommendations, quick answers to your questions, and help planning your learning journey.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                <CheckCircle size={14} className="mr-1" />
                <span>Course Recommendations</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                <CheckCircle size={14} className="mr-1" />
                <span>Learning Path Planning</span>
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center">
                <CheckCircle size={14} className="mr-1" />
                <span>Study Assistance</span>
              </div>
            </div>
          </div>
          <Link 
            to="/dashboard/ai-assistant" 
            className="btn bg-white text-primary-500 hover:bg-neutral-100 btn-lg"
          >
            Try AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;