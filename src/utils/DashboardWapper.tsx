import Dashboard from '@/pages/Dashboard/Dashboard';
import { selectCurrentUser } from '@/redux/api/features/auth/authSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const DashboardWapper: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const role = user?.role;

  React.useEffect(() => {
    if (!role) {
      toast.error('Please login to access this page');
      navigate('/login');
    }
  }, [role, navigate]);

  if (!role) return null;

  return <Dashboard role={role as any} />;
};

export default DashboardWapper;