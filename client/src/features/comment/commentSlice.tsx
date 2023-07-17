import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import commentService from "./commentService";
interface initialTypes {
  comments: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  messages: any;
}
const initialState: initialTypes = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  messages: "",
};

// Create new Twit
export const createComment: any = createAsyncThunk(
  "Comments/create",
  async (commentData, thunkAPI) => {
    try {
      return await commentService.createComment(commentData);
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
export const updateComment: any = createAsyncThunk(
  "Comments/update",
  async ([id, commentData]: any, thunkAPI) => {
    try {
      return await commentService.updateComment(id, commentData);
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
export const getComments: any = createAsyncThunk(
  "Comments/getAll",
  async (_, thunkAPI) => {
    try {
      return await commentService.getComments();
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
// Delete Users Twits
export const deleteComments: any = createAsyncThunk(
  "Comments/delete",
  async (id: string, thunkAPI) => {
    try {
      return await commentService.deleteComments(id);
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

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = payload;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.message = ''
      });
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = payload;
      })
      .addCase(getComments.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = true;
        state.messages = payload;
      });
    builder
      .addCase(deleteComments.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(deleteComments.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = payload;
      })
      .addCase(deleteComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messages = action.payload;
      });
    builder
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = payload;
      })
      .addCase(updateComment.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = true;
        state.messages = payload;
      });
  },
});

export const {reset} = commentSlice.actions;
export default commentSlice.reducer;
