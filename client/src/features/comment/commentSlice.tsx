import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
			console.log(commentData);
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

export const commentSlice = createSlice({
	name: "Twit",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(createComment.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(createComment.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.comments = [...state.comments, payload];
			console.log(state.comments, payload);
		});
		builder.addCase(createComment.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			// state.message = ''
		});
		builder.addCase(getComments.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(getComments.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.comments = payload;
		});
		builder.addCase(getComments.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.messages = action.payload;
		});
	},
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
