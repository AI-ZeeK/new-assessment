import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import authService, {updateProfilePhotoApi} from "./authService";
import {QueryState} from "../post/postSlice";

// Get user from local Storage
const user =
  localStorage.getItem("access-user") !== null
    ? JSON.parse(localStorage.getItem("access-user") as string)
    : null;

export interface User {
  id: string;
  username?: string;
  name: string;
  email: string;
  bio: string;
  createdAt: string;
  profilePhoto?: string;
  friends: string[];
}
const User = {
  id: "",
  username: "",
  name: "",
  email: "",
  bio: "",
  createdAt: "",
  profilePhoto: "",
  friends: [],
};

interface initialTypes {
  user: User | null;
  myUser: User;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
  userState: QueryState;
  infoState: QueryState;
  myUserState: QueryState;
}

const initialState: initialTypes = {
  user: null,
  myUser: {
    id: "",
    username: "",
    name: "",
    bio: "",
    email: "",
    createdAt: "",
    profilePhoto: "",
    friends: [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  userState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  infoState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  myUserState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  message: [],
};

// Login user
export const login: any = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout user
export const logout: any = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//  Create new Twit
export const updateProfilePhoto: any = createAsyncThunk(
  "Twits/create",
  async ([id, profilePhoto]: any, thunkAPI) => {
    try {
      return await updateProfilePhotoApi(id, profilePhoto);
    } catch (error: any) {
      console.log(123, error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBio: any = createAsyncThunk(
  "bio/put",
  async ([id, bio]: any, thunkAPI) => {
    try {
      return await authService.updateBio(id, bio);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUser: any = createAsyncThunk(
  "User/get",
  async (id: any, thunkAPI) => {
    try {
      return await authService.getUser(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMyUser: any = createAsyncThunk(
  "MyUser/get",
  async (id: any, thunkAPI) => {
    try {
      return await authService.getUser(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetUser: (state) => {
      state.user = null;
    },
    setUser: ({user}, {payload}) => {
      user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;

        // state.user = null;
      });
    builder
      .addCase(updateProfilePhoto.pending, (state) => {
        state.infoState.isLoading = true;
      })
      .addCase(updateProfilePhoto.fulfilled, (state, {payload}) => {
        state.infoState.isLoading = false;
        state.infoState.isSuccess = true;
        state.user = payload;
      })
      .addCase(updateProfilePhoto.rejected, (state, {payload}) => {
        state.infoState.isLoading = false;
        state.infoState.isError = true;
        state.message = payload;
      });
    builder
      .addCase(updateBio.pending, (state) => {
        state.infoState.isLoading = true;
      })
      .addCase(updateBio.fulfilled, (state, {payload}) => {
        state.infoState.isLoading = false;
        state.infoState.isSuccess = true;
        state.user = payload;
      })
      .addCase(updateBio.rejected, (state, {payload}) => {
        state.infoState.isLoading = false;
        state.infoState.isError = true;
        state.message = payload;
      });
    builder
      .addCase(getUser.pending, (state) => {
        state.userState.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.userState.isLoading = false;
        state.userState.isSuccess = true;
        state.user = payload;
      })
      .addCase(getUser.rejected, (state, {payload}) => {
        state.userState.isLoading = false;
        state.userState.isError = true;
        state.user = null;
        state.message = payload;
      });
    builder
      .addCase(getMyUser.pending, (state) => {
        state.myUserState.isLoading = true;
      })
      .addCase(getMyUser.fulfilled, (state, {payload}) => {
        state.myUserState.isLoading = false;
        state.myUserState.isSuccess = true;
        state.myUser = payload;
      })
      .addCase(getMyUser.rejected, (state, {payload}) => {
        state.myUserState.isLoading = false;
        state.myUserState.isError = true;
        state.message = payload;
      });
  },
});

export const {reset, resetUser, setUser} = authSlice.actions;
export default authSlice.reducer;
