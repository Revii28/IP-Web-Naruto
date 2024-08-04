import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  villages: []
};

export const villagesSlice = createSlice({
  name: "village",
  initialState,
  reducers: {
    setLoading: (state, action) => { 
      state.loading = action.payload;
    },
    setVillages: (state, action) => { 
      state.villages = action.payload;
    }
  }
});

export const { setLoading, setVillages } = villagesSlice.actions;

export default villagesSlice.reducer;
