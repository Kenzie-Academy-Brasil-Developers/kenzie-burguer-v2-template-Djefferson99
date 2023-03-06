import { toast } from 'react-toastify';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDefaultProviderProps } from './@types';
import { Api } from '../Api/axios';

export interface IFormDataRegister {
  name?: string;
  email: string;
  password: string;
  password2?: string;
  senha?: string;
}

export interface IUserProvider {
  userResgister: (formData: IFormDataRegister) => void;
  userLogin: (formData: IFormDataRegister) => void;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  setUser?: {
    id: string;
    name: string;
    email: string;
  };
  userLogout: () => void;
}

export const UserContext = createContext({} as IUserProvider);

export const UserProvider = ({ children }: IDefaultProviderProps) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const userResgister = async (formData: IFormDataRegister) => {
    try {
      const register: IFormDataRegister = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      };

      await Api.post('/users', register);
      toast('Cadastrado com sucesso!');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  const userLogin = async (formData: IFormDataRegister) => {
    try {
      const register: IFormDataRegister = {
        email: formData.email,
        password: formData.password,
      };

      const res = await Api.post('/login ', { ...register });
      toast('Logado com sucesso!');
      setUser(res.data.user);
      window.localStorage.clear();
      window.localStorage.setItem('@TOKEN', res.data.accessToken);
      window.localStorage.setItem('@USERID', res.data.user.id);
      setTimeout(() => {
        navigate('/shop');
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{ userResgister, userLogin, user, userLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};
