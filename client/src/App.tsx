import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Header from "./components/Header";

function App() {
	return (
		<>
			<BrowserRouter>
				<div className="container">
					<Header />
					<Routes>
						<Route path="/" element={<Dashboard />}></Route>
						<Route path="/auth" element={<Login />}></Route>
					</Routes>
				</div>
				<ToastContainer />
			</BrowserRouter>
		</>
	);
}

export default App;
