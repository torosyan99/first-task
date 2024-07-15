import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("TABLE/USERS", async () => {
  const users = fetch("https://dummyjson.com/users")
    .then((response) => response.json())
    .then((data) => data);
console.log('get')
  return users;
});

export const filterUsers = createAsyncThunk(
  "TABLE/FILTER",
  async ({ key, value }) => {
console.log(key,value)
    const users = fetch(
      `https://dummyjson.com/users/filter?key=${key}&value=${value}`
    )
      .then((response) => response.json())
      .then((data) => data);
console.log('filter')

    return users;
  }
);

const tableSlice = createSlice({
  name: "TABLE",
  initialState: [],
  extraReducers: (build) => {
    build.addCase(getUsers.fulfilled, (state, action) => {
      return action.payload.users;
    });

    build.addCase(filterUsers.fulfilled, (state, action) => {
      return action.payload.users;
    });
  },
});

export default tableSlice.reducer;
