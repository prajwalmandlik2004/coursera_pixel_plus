import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardHome from '../components/dashboard/DashboardHome';
import MyCourses from '../components/dashboard/MyCourses';
import AiAssistant from '../components/dashboard/AiAssistant';
import GoalPlanner from '../components/dashboard/GoalPlanner';
import Profile from '../components/dashboard/Profile';
import Settings from '../components/dashboard/Settings';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="courses" element={<MyCourses />} />
        <Route path="ai-assistant" element={<AiAssistant />} />
        <Route path="goals" element={<GoalPlanner />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardPage;