import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

interface UserProps {
  id: number;
  name: string;
  email: string;
  dateBirth: string;
  profile: number;
  gender: string;
  avatar: string;
}
interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps;
  a_profiles: string[];
  att: boolean;
  setAtt: React.Dispatch<React.SetStateAction<boolean>>;
}

const userModel = {
  id: 0,
  name: '',
  email: '',
  dateBirth: '',
  profile: null,
  gender: '',
  avatar: '',
};

export const AuthContext = React.createContext<AuthContextProps>({
  isAuthenticated: true,
  setIsAuthenticated: () => { },
  user: userModel,
  a_profiles: ['Administrador', 'Colaborador'],
  att: false,
  setAtt: () => { },
});

export const AuthProvider: React.FC = ({ children }) => {
  const a_profiles = ['Administrador', 'Colaborador'];
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) ?? userModel;
  const [att, setAtt] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      api.post('/api/auth/verifyJwt', { token })
        .then(response => {
          setIsAuthenticated(response.data.validate);
        })
        .catch(error => {
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, a_profiles, att, setAtt }} >
      {children}
    </AuthContext.Provider>
  );
};
