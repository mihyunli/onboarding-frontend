import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface IGuestGuardProps {
  children: JSX.Element;
}

const GuestGuard = ({ children }: IGuestGuardProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return isLoading ? (
      <></>
    ) : (
      <Navigate to="/login" replace state={{ pathFrom: location.pathname }} />
    );
  }

  return children;
};

export default GuestGuard;
