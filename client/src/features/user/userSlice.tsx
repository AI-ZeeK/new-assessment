import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {QueryState} from "../post/postSlice";
import userService from "./userService";
import {Post} from "../app/AppSlice";

interface FriendRequest {
  id: string;
  friendId: string;
  userId: string;
  name: string;
  profilePhoto: string;
}
interface FriendsPosts {
  name: string;
  id: string;
  profilePhoto: string;
  posts: Post[];
}

interface initialTypes {
  friendRequests: FriendRequest[];
  sentFriendRequests: FriendRequest[];
  friendsPosts: FriendsPosts[];
  sendRequestState: QueryState;
  friendsState: QueryState;
  sentRequests: QueryState;
  message: string;
}

const initialState: initialTypes = {
  friendRequests: [],
  sentFriendRequests: [],
  friendsPosts: [],
  friendsState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  sendRequestState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  sentRequests: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  message: "",
};

export const sendFriendRequest: any = createAsyncThunk(
  "send/friendrequest",
  async ([friendId, userId]: any, thunkAPI) => {
    try {
      return userService.SendFriendRequest(friendId, userId);
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
export const getFriendRequests: any = createAsyncThunk(
  "get/friendrequest",
  async (userId: string, thunkAPI) => {
    try {
      return userService.GetFriendRequests(userId);
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
export const getSentFriendRequests: any = createAsyncThunk(
  "get sent/friendrequests",
  async (userId: string, thunkAPI) => {
    try {
      return userService.GetSentFriendRequests(userId);
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
export const getFriendPosts: any = createAsyncThunk(
  "get/friendsposts",
  async (userId: string, thunkAPI) => {
    try {
      return userService.GetFriendPosts(userId);
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
export const acceptFriendRequest: any = createAsyncThunk(
  "verify/friendrequest",
  async ([requestId, requestState]: any, thunkAPI) => {
    try {
      return userService.AcceptFriendRequest(requestId, requestState);
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

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    reset: (state) => {
      (state.friendsState = {
        isError: false,
        isSuccess: false,
        isLoading: false,
      }),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendFriendRequest.pending, (state) => {
        state.sendRequestState.isLoading = true;
      })
      .addCase(sendFriendRequest.fulfilled, (state, {payload}) => {
        state.sendRequestState.isLoading = false;
        state.sendRequestState.isSuccess = true;
        state.sentFriendRequests = payload;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.sendRequestState.isLoading = false;
        state.sendRequestState.isError = true;
        state.message = action.payload;
      });
    builder
      .addCase(getFriendRequests.pending, (state) => {
        state.friendsState.isLoading = true;
      })
      .addCase(getFriendRequests.fulfilled, (state, {payload}) => {
        state.friendsState.isLoading = false;
        state.friendsState.isSuccess = true;
        state.friendRequests = payload;
      })
      .addCase(getFriendRequests.rejected, (state, {payload}) => {
        state.friendsState.isLoading = false;
        state.friendsState.isError = true;
        state.message = payload;
      });
    builder
      .addCase(getFriendPosts.pending, (state) => {
        state.friendsState.isLoading = true;
      })
      .addCase(getFriendPosts.fulfilled, (state, {payload}) => {
        state.friendsState.isLoading = false;
        state.friendsState.isSuccess = true;
        state.friendsPosts = payload;
      })
      .addCase(getFriendPosts.rejected, (state, {payload}) => {
        state.friendsState.isLoading = false;
        state.friendsState.isError = true;
        state.message = payload;
      });
    builder
      .addCase(getSentFriendRequests.pending, (state) => {
        state.sentRequests.isLoading = true;
      })
      .addCase(getSentFriendRequests.fulfilled, (state, {payload}) => {
        state.sentRequests.isLoading = false;
        state.sentRequests.isSuccess = true;
        state.sentFriendRequests = payload;
      })
      .addCase(getSentFriendRequests.rejected, (state, {payload}) => {
        state.sentRequests.isLoading = false;
        state.sentRequests.isError = true;
        state.message = payload;
      });
    builder
      .addCase(acceptFriendRequest.pending, (state) => {
        state.friendsState.isLoading = true;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, {payload}) => {
        state.friendsState.isLoading = false;
        state.friendsState.isSuccess = true;
        state.friendRequests = payload;
      })
      .addCase(acceptFriendRequest.rejected, (state, {payload}) => {
        state.friendsState.isLoading = false;
        state.friendsState.isError = true;
        state.message = payload;
      });
  },
});

export const {reset} = friendSlice.actions;
export default friendSlice.reducer;
