import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, refreshToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { userdata, AccessToken, ExpiresIn, RefreshToken } = action.payload;
      state.user = userdata;
      state.token = AccessToken;
      state.refreshToken = RefreshToken;
      Cookies.set('token', AccessToken);
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      Cookies.remove('token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsLoggedIn = (state) => state.auth.token !== null;