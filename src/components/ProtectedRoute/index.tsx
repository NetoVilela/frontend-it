import { Navigate } from "react-router";
import { api } from "../../services/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import LoadingButton from '@mui/lab/LoadingButton';

const ProtectedRoute = (props) => {
  const { isAuthenticated, setIsAuthenticated, att, setAtt } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  const validaJwt = () => {
    api.post('/api/auth/verifyJwt', { token })
      .then(response => {
        setIsAuthenticated(response.data.validate);
        setIsLoading(false);
      })
      .catch(error => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }
  validaJwt();
  if (token) {
    validaJwt();
  } else {
    setIsAuthenticated(false);
    setIsLoading(false);
  }

  useEffect(() => {
    setAtt(!att);
  }, []);

  if (isLoading) {
    return <LoadingButton />;
  }

  if (!isAuthenticated) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return props.children;
}

export default ProtectedRoute;
