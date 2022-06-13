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
  token: string;
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
    token: string;
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
  token: '',
};

const JWTReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
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

      // validate token

      // fetch user from db

      // set user in provider
    })().catch((err) => {});
  }, [state]);

  const login = async (form: IFormValues) => {
    const { user, token } = await signIn(form);
    dispatch({
      type: Types.Login,
      payload: {
        user: user.username,
        token: token.accessToken,
      },
    });
  };
  const register = (form: IFormValues) => {
    signUp(form);
  };
  const logout = () => {
    dispatch({ type: Types.Logout });
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
