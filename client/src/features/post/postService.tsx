import axios from "axios";
const API = axios.create({
	baseURL: `http://localhost:5000`,
});
const API_URL = "/api/post/";

API.interceptors.request.use((req) => {
	if (localStorage.getItem("access-user")) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem("access-user") as string).token
		}`;
	}

	return req;
});

const createTwit = async (TwitData: any) => {
	const { data } = await API.post(API_URL, {
		title: TwitData.twitTitle,
		content: TwitData.twitContent,
		authorId: TwitData.authorId,
	});
	console.log(data);
	return data;
};

//  Get user Twits
const getTwits = async () => {
	const { data } = await API.get(API_URL);

	return data;
};

// Delete user Twit
const deleteTwit = async (TwitId: any) => {
	console.log(TwitId);
	const { data } = await API.delete(`${API_URL}/TwitId`);

	console.log(data);
	return data;
};

const TwitService = {
	createTwit,
	getTwits,
	deleteTwit,
};

export default TwitService;
