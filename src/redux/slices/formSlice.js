import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formdata: null,
  currentStep: 1
};

const formSlice = createSlice({
  name: 'formdata',
  initialState,
  reducers: {
    setStepForm: (state, action) => {
      state.formdata = { ...state.formdata, ...action.payload };
      state.currentStep = state.currentStep + 1;
    },
    clearStepForm: (state) => {
      state.formdata = null;
      state.currentStep = 1;
    },
    setStepNumber: (state) => {
      state.currentStep = state.currentStep - 1;
    }
  },
});

export const { setStepForm, clearStepForm, setStepNumber } = formSlice.actions;
export default formSlice.reducer;
