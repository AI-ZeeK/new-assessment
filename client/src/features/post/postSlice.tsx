import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import postService from "./postService";
import {Post} from "../app/AppSlice";

interface initialTypes {
  posts: Post[];
  post: Post;
  userPosts: Post[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  postState: QueryState;
  appState: QueryState;
  getDjengsState: QueryState;
  djengState: QueryState;
  deleteDjengState: QueryState;
  messages: any;
}
export interface QueryState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
}

const initialState: initialTypes = {
  posts: [],
  post: {
    id: "",
    name: "",
    profilePhoto: "",
    image: "",
    content: "",
    createdAt: "",
    authorId: "",
    postlikes: [],
  },
  userPosts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  appState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  postState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  getDjengsState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  djengState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  deleteDjengState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
  },
  messages: "",
};

// Create new Twit
export const createDjeng: any = createAsyncThunk(
  "Djeng/create",
  async ([image, content, authorId]: any, thunkAPI) => {
    try {
      return await postService.createTwit(image, content, authorId);
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

export const likePost: any = createAsyncThunk(
  "post/like",
  async ([postId, userId]: any, thunkAPI) => {
    try {
      return await postService.likePost(postId, userId);
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

// Get Users Twits
export const getTwits: any = createAsyncThunk(
  "Twits/getAll",
  async (_, thunkAPI) => {
    try {
      return await postService.getTwits();
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
// Get Users Twits
export const getMyDjengs: any = createAsyncThunk(
  "Djengs/getMine",
  async (id: string, thunkAPI) => {
    try {
      return await postService.getMyDjengs(id);
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
// Get User Twits
export const getDjeng: any = createAsyncThunk(
  "Djeng/getPost",
  async (id: string, thunkAPI) => {
    try {
      return await postService.getDjeng(id);
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

// Delete User Twits
export const deleteTwit: any = createAsyncThunk(
  "Twits/delete",
  async (id, thunkAPI) => {
    try {
      return postService.deleteTwit(id);
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

export const TwitSlice = createSlice({
  name: "Djeng",
  initialState,
  reducers: {
    reset: (state) => initialState,
    deletePosts: (state, {payload}) => {
      state.posts = state.posts.filter((element: any) => {
        return element.id !== payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDjeng.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDjeng.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = payload;
      })
      .addCase(createDjeng.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.message = ''
      });
    builder
      .addCase(getTwits.pending, (state) => {
        console.log("pending");

        state.appState.isLoading = true;
      })
      .addCase(getTwits.fulfilled, (state, {payload}) => {
        console.log("fulfilled", payload);
        state.appState.isLoading = false;
        state.appState.isSuccess = true;
        state.posts = payload;
      })
      .addCase(getTwits.rejected, (state, {payload}) => {
        console.log("rehected", payload);

        state.appState.isLoading = false;
        state.appState.isError = true;
        state.messages = payload;
      });
    builder
      .addCase(getMyDjengs.pending, (state) => {
        state.getDjengsState.isLoading = true;
      })
      .addCase(getMyDjengs.fulfilled, (state, {payload}) => {
        state.getDjengsState.isLoading = false;
        state.getDjengsState.isSuccess = true;
        state.userPosts = payload;
      })
      .addCase(getMyDjengs.rejected, (state, action) => {
        state.getDjengsState.isLoading = false;
        state.getDjengsState.isError = true;
        state.messages = action.payload;
      });
    builder
      .addCase(getDjeng.pending, (state) => {
        state.djengState.isLoading = true;
      })
      .addCase(getDjeng.fulfilled, (state, {payload}) => {
        state.djengState.isLoading = false;
        state.djengState.isSuccess = true;
        state.post = payload;
      })
      .addCase(getDjeng.rejected, (state, {payload}) => {
        state.djengState.isLoading = false;
        state.djengState.isError = true;
        state.messages = payload;
      });
    builder
      .addCase(deleteTwit.pending, (state) => {
        state.deleteDjengState.isLoading = true;
      })
      .addCase(deleteTwit.fulfilled, (state, {payload}) => {
        state.deleteDjengState.isLoading = false;
        state.deleteDjengState.isSuccess = true;
        state.posts = payload;
      })
      .addCase(deleteTwit.rejected, (state, action) => {
        state.deleteDjengState.isLoading = false;
        state.deleteDjengState.isError = true;
        // state.message = action.payload;
      });
    builder
      .addCase(likePost.pending, (state) => {
        state.postState.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, {payload}) => {
        state.postState.isLoading = false;
        state.postState.isSuccess = true;

        state.posts = payload;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.postState.isLoading = false;
        state.postState.isError = true;
        // state.message = action.payload;
      });
  },
});

export const {reset, deletePosts} = TwitSlice.actions;
export default TwitSlice.reducer;
