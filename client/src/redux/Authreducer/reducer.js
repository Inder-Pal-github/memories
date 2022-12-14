import {
  saveToLocalStorage,
  removeFromLocalStorage,
} from "../../utils/localstorage";
import * as types from "./actionTypes";
const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  profile: null,
  error_message: null,
};

export const authreducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.GOOGLE_SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case types.GOOGLE_SIGNIN_SUCCESS:
      saveToLocalStorage("profile", payload);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        profile: payload,
      };
    case types.GOOGLE_SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case types.GOOGLE_LOGOUT_SUCCESS:
      removeFromLocalStorage("profile");
      return {
        ...state,
        isAuth: false,
        profile: null,
      };
    case types.USER_SIGNIN_SUCCESS:
      console.log(payload);
      saveToLocalStorage("profile", {
        result: payload.user,
        token: payload.token,
      });
      return {
        ...state,
        isAuth: true,
        profile: payload,
        isError:false,
        error_message: null,
      };
    case types.USER_SIGNIN_FAILURE:
      return {
        ...state,
        isError: true,
        error_message: payload,
      };
    case types.USER_SIGNUP_SUCCESS:
      saveToLocalStorage("profile", {
        result: payload.user,
        token: payload.token,
      });
      return {
        ...state,
        isAuth: true,
        profile: payload,
        isError:false,
        error_message: null,
      };
    case types.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isError: true,
        error_message: payload,
      };
    default:
      return state;
  }
};
