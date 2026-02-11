import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store-hooks';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authorizationStatus = useAppSelector((state) => state.auth.authorizationStatus);
  return authorizationStatus === 'AUTH' ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
