import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";
interface initialTypes {
	posts: any;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	messages: any;
}
const initialState: initialTypes = {
	posts: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	messages: "",
};

// Create new Twit
export const createTwit: any = createAsyncThunk(
	"Twits/create",
	async (twitData, thunkAPI) => {
		try {
			return await postService.createTwit(twitData);
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

// Delete User Twits
export const deleteTwit: any = createAsyncThunk(
	"Twits/delete",
	async (id, thunkAPI) => {
		try {
			return await postService.deleteTwit(id);
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
	name: "Twit",
	initialState,
	reducers: {
		reset: (state) => initialState,
		deletePosts: (state, { payload }) => {
			state.posts = state.posts.filter((element: any) => {
				return element.id !== payload;
			});
		},
	},
	extraReducers: (builder) => {
		builder.addCase(createTwit.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(createTwit.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.posts = [...state.posts, payload];
			console.log(state.posts, payload);
		});
		builder.addCase(createTwit.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			// state.message = ''
		});
		builder.addCase(getTwits.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(getTwits.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.posts = payload;
		});
		builder.addCase(getTwits.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.messages = action.payload;
		});
		builder.addCase(deleteTwit.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(deleteTwit.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			// state.Twits = state.Twits.filter(
			// 	(Twit) => Twit._id !== action.payload.id
			// );
		});
		builder.addCase(deleteTwit.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			// state.message = action.payload;
		});
	},
});

export const { reset, deletePosts } = TwitSlice.actions;
export default TwitSlice.reducer;
