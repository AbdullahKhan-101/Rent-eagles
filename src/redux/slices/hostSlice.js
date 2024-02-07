import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  host: null,
};

const hostSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    setHost: (state, action) => {
      state.host = {...action.payload , authenticated: true}
   
    },
    LogoutHost: (state) => {
       state.host = null;
    }
  },
});

export const { setHost , LogoutHost } = hostSlice.actions;
export default hostSlice.reducer;