import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("TABLE/USERS", async () => {
  const users = fetch("https://dummyjson.com/users")
    .then((response) => response.json())
    .then((data) => data);
  return users;
});

export const filterUsers = createAsyncThunk(
  "TABLE/FILTER",
  async ({ key, value }) => {
    const users = await fetch(
      `https://dummyjson.com/users/filter?key=${key}&value=${value}`
    )
      .then((response) => response.json())
      .then((data) => data);

    return {
      users: users.users,
      value,
    };
  }
);

const tableSlice = createSlice({
  name: "TABLE",
  initialState: {
    receivedData: [],
    data: [],
    originalData: [],
    sortedKey: "",
    sortedData: false,
    error: false,
  },
  reducers: {
    sortState: (state, action) => {
      let { key, type } = action.payload;

      if (type == "up") state.originalData = [...state.data];
      else if (type === "none") {
        state.data = state.originalData;
        state.originalData = [];
        state.sortedKey = "";
        return state;
      }
      state.data.sort((a, b) => {
        if (typeof a[key] === "number" && typeof b[key] === "number") {
          if (type === "up") return a[key] - b[key];
          else if (type == "down") return b[key] - a[key];
        }

        if (key == "address") {
          if (type === "up")
            return a[key]["address"].localeCompare(b[key]["address"]);
          else if (type == "down")
            return b[key]["address"].localeCompare(a[key]["address"]);
        }

        if (type === "up") return a[key].localeCompare(b[key]);
        else if (type == "down") return b[key].localeCompare(a[key]);
      });

      state.sortedData = true;
      state.sortedKey = key;
      return state;
    },
  },
  extraReducers: (build) => {
    build.addCase(getUsers.fulfilled, (state, action) => {
      return {
        ...state,
        receivedData: action.payload.users,
        data: action.payload.users,
      };
    });

    build.addCase(getUsers.rejected, (state) => {
      state.error = true;
    });

    build.addCase(filterUsers.fulfilled, (state, action) => {
      const { value, users } = action.payload;
      state.data = value.length > 0 ? users : state.receivedData;
      if (state.sortedData) state.sortedData = false;
      return state;
    });
    build.addCase(filterUsers.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { sortState, refreshState } = tableSlice.actions;
export default tableSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const getUsers = createAsyncThunk("TABLE/USERS", async () => {
//   const users = fetch("https://dummyjson.com/users")
//     .then((response) => response.json())
//     .then((data) => data);
//   return users;
// });

// let abortController;
// export const filterUsers = createAsyncThunk(
//   "TABLE/FILTER",
//   async ({ key, value }) => {
//     console.log(abortController);
//     if (abortController) abortController.abort();

//     abortController = new AbortController();
//     const users = fetch(
//       `https://dummyjson.com/users/filter?key=${key}&value=${value}`,
//       {
//         signal: abortController.signal,
//       }
//     )
//       .then((response) => response.json())
//       .then((data) => data);

//     return users;
//   }
// );

// const tableSlice = createSlice({
//   name: "TABLE",
//   initialState: {
//     receivedData: [],
//     data: [],
//     sortedData: false,
//   },
//   reducers: {
//     sortState: (state, action) => {
//       let { key, type } = action.payload;

//       const newData = state.data.sort((a, b) => {
//         if (typeof a[key] === "number" && typeof b[key] === "number") {
//           if (type === "up") return a[key] - b[key];
//           else if (type == "down") return b[key] - a[key];
//         }

//         if (key == "address") {
//           if (type === "up")
//             return a[key]["address"].localeCompare(b[key]["address"]);
//           else if (type == "down")
//             return b[key]["address"].localeCompare(a[key]["address"]);
//         }

//         if (type === "up") return a[key].localeCompare(b[key]);
//         else if (type == "down") return b[key].localeCompare(a[key]);
//       });

//       state.data = newData;
//       state.sortedData = true;
//       return state;
//     },
//     refreshState: (state) => {
//       state.data = [...state.receivedData];
//       state.sortedData = false;

//       return state;
//     },
//   },
//   extraReducers: (build) => {
//     build.addCase(getUsers.fulfilled, (state, action) => {
//       console.log("get");
//       return {
//         receivedData: action.payload.users,
//         data: [...action.payload.users],
//       };
//     });

//     build.addCase(filterUsers.fulfilled, (state, action) => {
//       state.data =
//         action.payload.users.length > 0
//           ? action.payload.users
//           : state.receivedData;
//       if (state.sortedData) state.sortedData = false;
//       return state;
//     });
//   },
// });

// export const { sortState, refreshState } = tableSlice.actions;
// export default tableSlice.reducer;
