import { createContext, ReactNode, useEffect, useReducer } from 'react';

// apis
import { signIn, signUp } from '../api/auth';

// utils
import { isEmpty, get } from 'lodash';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type AuthUser = null | User;

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  logout: () => void;
  login: (form: IFormValues) => void;
  register: (form: IFormValues) => void;
};

type AuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
};

export interface User {
  username: string;
}
export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

interface IFormValues {
  email: string;
  username?: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    (async () => {
      console.log('@@@ JWTContext INIT @@@');

      // get accessToken

      // validate token

      // fetch user from db

      // set user in provider
    })().catch((err) => {});
  }, []);

  const login = (form: IFormValues) => signIn(form);
  const register = (form: IFormValues) => signUp(form);
  const logout = () => {
    console.log('로그아웃 호출!');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
