import { Route, Routes } from 'react-router-dom';

import { Auth } from '@/pages/Auth';
import { Dashboard } from '@/pages/Dashboard';


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;
