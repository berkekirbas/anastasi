import AuthService from "@/service/Auth.service";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  phone: null,
  isAuthenticated: null,
  isLoading: false,
  error: null,
};

export const authSelector = (state) => state.auth;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startAuthProcess(state) {
      state.isLoading = true;
    },
    authSuccess(state, { payload }) {
      state.user = payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    // TODO: error yönetimi için backend den hata mesajı döndürülecek
    authFailed(state) {
      state.error = true;
      state.isLoading = false;
      state.isAuthenticated = false;
    },
    editUserSuccess(state, { payload }) {
      state.user.name = payload.name;
      state.user.email = payload.email;
      state.user.phone = payload.phone;
    },
    refreshTokenSuccess(state, { payload }) {
      state.user = payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    getPhoneSuccess(state, { payload }) {
      state.phone = payload.data;
      state.isLoading = false;
    },
  },
});

export const {
  startAuthProcess,
  authSuccess,
  authFailed,
  editUserSuccess,
  refreshTokenSuccess,
  getPhoneSuccess,
} = authSlice.actions;

// reducers
export default authSlice.reducer;

export const login = (email, password) => async (dispatch) => {
  dispatch(startAuthProcess());
  try {
    const response = await AuthService.login(email, password);

    localStorage.setItem("type", response.authorisation.type);
    localStorage.setItem("token", response.authorisation.token);

    dispatch(authSuccess(response));
  } catch (error) {
    dispatch(authFailed());
  }
};

export const authCheck = () => async (dispatch) => {
  dispatch(startAuthProcess());
  try {
    const response = await AuthService.authCheck();
    if (response == "Unauthenticated.") {
      dispatch(authFailed());
      return;
    }
    dispatch(authSuccess({ user: response }));
  } catch (error) {
    dispatch(refreshToken());
    dispatch(authFailed());
  }
};

export const editUser = (name, email, phone) => async (dispatch) => {
  dispatch(startAuthProcess());
  try {
    const response = await AuthService.editUser(name, email, phone);
    dispatch(editUserSuccess({ name, email, phone }));
  } catch (error) {
    dispatch(authFailed());
  }
};

export const refreshToken = () => async (dispatch) => {
  dispatch(startAuthProcess());
  try {
    const response = await AuthService.refreshToken();
    localStorage.setItem("type", response.authorisation.type);
    localStorage.setItem("token", response.authorisation.token);
    dispatch(refreshTokenSuccess(response));
  } catch (error) {
    dispatch(authFailed());
  }
};

export const getPhone = () => async (dispatch) => {
  dispatch(startAuthProcess());
  try {
    const response = await AuthService.getPhone();
    dispatch(getPhoneSuccess(response));
  } catch (error) {
    dispatch(authFailed());
  }
};
