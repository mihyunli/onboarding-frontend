import { createContext, ReactNode, useEffect, useReducer } from 'react';

// apis
import { signIn, signUp, getProfile } from '../api/auth';

// utils
import { isEmpty, get } from 'lodash';
import { isValidToken, setSession } from '../utils/jwt';
import { useNavigate } from 'react-router-dom';

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
  email: string;
  id: string;
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

  const navigation = useNavigate();

  useEffect(() => {
    (async () => {
      console.log('@@@ JWTContext INIT @@@', state);
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return handleUnauthorizedUsers();

      const isValid = isValidToken(accessToken);
      if (!isValid) return handleUnauthorizedUsers();

      setSession(accessToken);
      const { username, email, id } = await getProfile();
      dispatch({
        type: Types.Initial,
        payload: {
          isAuthenticated: true,
          user: { username, email, id },
        },
      });
    })().catch((err) => {});
  }, []);

  const handleUnauthorizedUsers = () => {
    dispatch({
      type: Types.Initial,
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
    return navigation('/login');
  };

  const login = async (form: IFormValues) => {
    try {
      const { user, token } = await signIn(form);
      setSession(token.accessToken);
      dispatch({
        type: Types.Login,
        payload: {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
      });
    } catch (e) {
      console.error(e);
    }
  };
  const register = async (form: IFormValues) => {
    try {
      await signUp(form);
    } catch (e) {
      console.error(e);
    }
  };
  const logout = () => {
    setSession();
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
