import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/auth/auth.slice';

const UnprotectedRoute = (props: any) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Navigate to='/lobby' replace={true} /> : props.children;
};

export default UnprotectedRoute;
