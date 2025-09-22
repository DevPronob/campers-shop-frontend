import { RootState } from '../../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUser {
  id: string;
  name: string;
  role: string;
  email: string;
  address?: string;
  phone: string;
  iat: number;
  exp: number;
}

export interface IAuth {
  user: IUser | null;
  token: string | null;
}

const initialState: IAuth = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// selectors
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
