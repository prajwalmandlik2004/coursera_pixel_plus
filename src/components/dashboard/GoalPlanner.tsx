import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit, 
  Trash2,
  TrendingUp
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Types
interface Goal {
  id: string;
  title: string;
  deadline: string;
  targetHours: number;
  completedHours: number;
  category: 'Course' | 'Skill' | 'Certificate';
  completed: boolean;
}

// Mock data
const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Complete JavaScript Fundamentals Course',
    deadline: '2025-08-15',
    targetHours: 40,
    completedHours: 28,
    category: 'Course',
    completed: false
  },
  {
    id: '2',
    title: 'Master React Hooks',
    deadline: '2025-07-10',
    targetHours: 20,
    completedHours: 12,
    category: 'Skill',
    completed: false
  },
  {
    id: '3',
    title: 'Earn Google Data Analytics Certificate',
    deadline: '2025-09-30',
    targetHours: 80,
    completedHours: 20,
    category: 'Certificate',
    completed: false
  },
  {
    id: '4',
    title: 'Learn HTML & CSS Basics',
    deadline: '2025-05-20',
    targetHours: 15,
    completedHours: 15,
    category: 'Skill',
    completed: true
  }
];

// Progress chart data
const progressData = [
  { name: 'Week 1', hours: 5 },
  { name: 'Week 2', hours: 8 },
  { name: 'Week 3', hours: 6 },
  { name: 'Week 4', hours: 12 },
  { name: 'Week 5', hours: 9 },
  { name: 'Week 6', hours: 14 },
  { name: 'Week 7', hours: 10 },
  { name: 'Week 8', hours: 15 },
];

const GoalPlanner: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<Goal, 'id' | 'completed' | 'completedHours'>>({
    title: '',
    deadline: '',
    targetHours: 0,
    category: 'Course'
  });
  
  // Filter goals based on active tab
  const filteredGoals = goals.filter(goal => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !goal.completed;
    if (activeTab === 'completed') return goal.completed;
    return true;
  });
  
  // Calculate total progress
  const totalTargetHours = goals.reduce((sum, goal) => sum + goal.targetHours, 0);
  const totalCompletedHours = goals.reduce((sum, goal) => sum + goal.completedHours, 0);
  const overallProgress = totalTargetHours > 0 ? (totalCompletedHours / totalTargetHours) * 100 : 0;
  
  // Add new goal
  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.deadline || newGoal.targetHours <= 0) {
      return;
    }
    
    const goal: Goal = {
      id: Math.random().toString(36).substr(2, 9),
      ...newGoal,
      completedHours: 0,
      completed: false
    };
    
    setGoals([...goals, goal]);
    setIsAddingGoal(false);
    setNewGoal({
      title: '',
      deadline: '',
      targetHours: 0,
      category: 'Course'
    });
  };
  
  // Toggle goal completion
  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const completed = !goal.completed;
        return {
          ...goal,
          completed,
          completedHours: completed ? goal.targetHours : goal.completedHours
        };
      }
      return goal;
    }));
  };
  
  // Update goal hours
  const updateGoalHours = (id: string, hours: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const newHours = Math.min(Math.max(0, hours), goal.targetHours);
        return {
          ...goal,
          completedHours: newHours,
          completed: newHours === goal.targetHours
        };
      }
      return goal;
    }));
  };
  
  // Delete goal
  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };
  
  // Calculate days remaining for a goal
  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-card p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold">Learning Goals</h2>
          <button 
            className="btn btn-primary flex items-center gap-2 mt-2 md:mt-0"
            onClick={() => setIsAddingGoal(true)}
          >
            <Plus size={18} />
            <span>Add New Goal</span>
          </button>
        </div>
        
        {/* Overall Progress */}
        <div className="bg-primary-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium mb-2">Overall Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-neutral-600">
                  {totalCompletedHours} of {totalTargetHours} hours completed
                </span>
                <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-primary-500 h-4" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">
                  {goals.filter(g => g.completed).length}
                </div>
                <div className="text-xs text-neutral-500">Goals Completed</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Weekly Progress Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Weekly Learning Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={progressData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `${value}h`}
                />
                <Tooltip formatter={(value) => [`${value} hours`, 'Study Time']} />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#0056D2"
                  fill="#0056D2"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Add Goal Form */}
        {isAddingGoal && (
          <div className="bg-neutral-50 rounded-lg p-4 mb-6 border border-neutral-200">
            <h3 className="text-lg font-medium mb-4">Add New Goal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                  Goal Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="input"
                  placeholder="E.g., Complete Python Bootcamp"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  className="input"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value as Goal['category']})}
                >
                  <option value="Course">Course</option>
                  <option value="Skill">Skill</option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-neutral-700 mb-1">
                  Target Completion Date
                </label>
                <input
                  id="deadline"
                  type="date"
                  className="input"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-neutral-700 mb-1">
                  Target Hours
                </label>
                <input
                  id="hours"
                  type="number"
                  min="1"
                  className="input"
                  placeholder="How many hours to complete?"
                  value={newGoal.targetHours || ''}
                  onChange={(e) => setNewGoal({...newGoal, targetHours: parseInt(e.target.value) || 0})}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAddingGoal(false)}
                className="btn border border-neutral-300 text-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGoal}
                className="btn btn-primary"
                disabled={!newGoal.title || !newGoal.deadline || newGoal.targetHours <= 0}
              >
                Save Goal
              </button>
            </div>
          </div>
        )}
        
        {/* Goals Tabs */}
        <div className="border-b border-neutral-200 mb-6">
          <div className="flex space-x-8">
            <button 
              className={`pb-3 px-1 ${activeTab === 'all' ? 'text-primary-500 font-medium border-b-2 border-primary-500' : 'text-neutral-600'}`}
              onClick={() => setActiveTab('all')}
            >
              All Goals ({goals.length})
            </button>
            <button 
              className={`pb-3 px-1 ${activeTab === 'active' ? 'text-primary-500 font-medium border-b-2 border-primary-500' : 'text-neutral-600'}`}
              onClick={() => setActiveTab('active')}
            >
              Active ({goals.filter(g => !g.completed).length})
            </button>
            <button 
              className={`pb-3 px-1 ${activeTab === 'completed' ? 'text-primary-500 font-medium border-b-2 border-primary-500' : 'text-neutral-600'}`}
              onClick={() => setActiveTab('completed')}
            >
              Completed ({goals.filter(g => g.completed).length})
            </button>
          </div>
        </div>
        
        {/* Goals List */}
        {filteredGoals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-500">No goals found in this category.</p>
            <button 
              className="btn btn-primary mt-4"
              onClick={() => setIsAddingGoal(true)}
            >
              Create Your First Goal
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGoals.map((goal) => (
              <div 
                key={goal.id} 
                className={`border rounded-lg p-4 ${
                  goal.completed 
                    ? 'border-success-200 bg-success-50' 
                    : 'border-neutral-200 hover:border-primary-300'
                } transition-colors`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleGoalCompletion(goal.id)}
                        className={`mt-1 flex-shrink-0 ${goal.completed ? 'text-success-500' : 'text-neutral-300 hover:text-primary-500'}`}
                      >
                        {goal.completed ? <CheckCircle size={20} /> : <XCircle size={20} />}
                      </button>
                      <div>
                        <h3 className={`font-medium ${goal.completed ? 'text-success-700' : 'text-neutral-800'}`}>
                          {goal.title}
                        </h3>
                        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-1 text-sm">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            goal.category === 'Course' 
                              ? 'bg-blue-100 text-blue-700' 
                              : goal.category === 'Skill' 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {goal.category}
                          </span>
                          <span className="flex items-center text-neutral-500">
                            <Calendar size={14} className="mr-1" />
                            {goal.completed 
                              ? 'Completed' 
                              : getDaysRemaining(goal.deadline) > 0 
                              ? `${getDaysRemaining(goal.deadline)} days left` 
                              : 'Overdue'}
                          </span>
                          <span className="flex items-center text-neutral-500">
                            <Clock size={14} className="mr-1" />
                            {goal.completedHours} of {goal.targetHours} hours
                          </span>
                        </div>
                        
                        <div className="mt-4 mb-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-neutral-600">Progress</span>
                            <span className="text-xs font-medium">
                              {Math.round((goal.completedHours / goal.targetHours) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-white rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${goal.completed ? 'bg-success-500' : 'bg-primary-500'}`}
                              style={{ width: `${(goal.completedHours / goal.targetHours) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {!goal.completed && (
                    <div className="flex md:flex-col gap-2 md:w-32 flex-shrink-0">
                      <div className="flex rounded-md overflow-hidden border border-neutral-300">
                        <button
                          onClick={() => updateGoalHours(goal.id, goal.completedHours - 1)}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 disabled:opacity-50"
                          disabled={goal.completedHours <= 0}
                        >
                          -
                        </button>
                        <div className="px-3 py-1 bg-white flex items-center justify-center min-w-[40px]">
                          {goal.completedHours}
                        </div>
                        <button
                          onClick={() => updateGoalHours(goal.id, goal.completedHours + 1)}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 disabled:opacity-50"
                          disabled={goal.completedHours >= goal.targetHours}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn p-2 border border-neutral-300 text-neutral-700 flex-1 flex justify-center">
                          <Edit size={16} />
                        </button>
                        <button 
                          className="btn p-2 border border-red-200 text-red-500 hover:bg-red-50 flex-1 flex justify-center"
                          onClick={() => deleteGoal(goal.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalPlanner;