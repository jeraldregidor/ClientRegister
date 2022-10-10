import { createSlice } from "@reduxjs/toolkit";

const USER_REGEX = /^[A-z]+[A-z0-9_]*$/;
const PWDLOW_REGEX = /[a-z]/;
const PWDUP_REGEX = /[A-Z]/;
const PWDNUMBER_REGEX = /(?=.*[0-9])\w+/;
const PWDSC_REGEX = /[*&^!@#$%]/;

const initialState = {
  isEmptyUserName: true,
  isEmptyName: true,
  isEmptyPass: true,
  isEmptyConfPass: true,
  isValidUserName: false,
  isValidPassword: false,
  isPassMatch: false,
  currentPWD: "",
  confirmPWD: "",
  isValidPwLength: false,
  isValidUserLength: false,
  isUserNoSc: false,
  isPwHasLow: false,
  isPwHasUpp: false,
  isPwHasNumber: false,
  isPwHasSc: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    evaluateUserName: (state, action) => {
      if (action.payload.length >= 1) {
        state.isEmptyUserName = false;
        if (USER_REGEX.test(action.payload)) {
          state.isUserNoSc = true;
        } else {
          state.isUserNoSc = false;
        }
        if (action.payload.length >= 3 && action.payload.length <= 24) {
          state.isValidUserLength = true;
        } else {
          state.isValidUserLength = false;
        }
        if (state.isUserNoSc && state.isValidUserLength) {
          state.isValidUserName = true;
        } else {
          state.isValidUserName = false;
        }
      } else {
        state.isEmptyUserName = true;
      }
    },
    evaluateName: (state, action) => {
      if (action.payload.length >= 1) {
        state.isEmptyName = false;
      } else {
        state.isEmptyName = true;
      }
    },
    evaluatePassword: (state, action) => {
      state.currentPWD = action.payload;
      if (action.payload.length >= 1) {
        state.isEmptyPass = false;

        if (state.confirmPWD === state.currentPWD) {
          state.isPassMatch = true;
        } else {
          state.isPassMatch = false;
        }
        if (action.payload.length >= 8 && action.payload.length <= 24) {
          console.log(
            action.payload.length >= 8 && action.payload.length <= 24
          );
          state.isValidPwLength = true;
        } else {
          state.isValidPwLength = false;
        }
        PWDLOW_REGEX.test(action.payload)
          ? (state.isPwHasLow = true)
          : (state.isPwHasLow = false);
        PWDUP_REGEX.test(action.payload)
          ? (state.isPwHasUpp = true)
          : (state.isPwHasUpp = false);
        PWDNUMBER_REGEX.test(action.payload)
          ? (state.isPwHasNumber = true)
          : (state.isPwHasNumber = false);
        PWDSC_REGEX.test(action.payload)
          ? (state.isPwHasSc = true)
          : (state.isPwHasSc = false);
        if (
          state.isPwHasLow &&
          state.isPwHasUpp & state.isPwHasNumber &&
          state.isPwHasSc
        ) {
          state.isValidPassword = true;
        } else {
          state.isValidPassword = false;
        }
      } else {
        state.isEmptyPass = true;
      }
      console.log(action.payload);
      console.log(PWDSC_REGEX.test(action.payload));
    },
    evaluateMatchPassword: (state, action) => {
      state.confirmPWD = action.payload;
      if (action.payload.length >= 1) {
        state.isEmptyConfPass = false;
        if (state.confirmPWD === state.currentPWD) {
          console.log(state.currentPWD);
          state.isPassMatch = true;
        } else {
          state.isPassMatch = false;
        }
      } else {
        state.isEmptyConfPass = true;
      }
    },
  },
});

export const {
  evaluateUserName,
  evaluateName,
  evaluatePassword,
  evaluateMatchPassword,
} = registerSlice.actions;

export default registerSlice.reducer;
