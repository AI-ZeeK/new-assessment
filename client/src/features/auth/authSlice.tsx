import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./authService";

// Get user from local Storage
const user =
	localStorage.getItem("access-user") !== null
		? JSON.parse(localStorage.getItem("access-user") as string)
		: null;

interface initialTypes {
	user: any;
	isError: boolean;
	isSuccess: boolean;
	isLoading: boolean;
	message: any;
}

const initialState: initialTypes = {
	user: user?.user,
	isError: false,
	isSuccess: false,
	isLoading: false,
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
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.user = action.payload;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
			state.user = null;
		});
	},
});

export const { reset, resetUser } = authSlice.actions;
export default authSlice.reducer;
