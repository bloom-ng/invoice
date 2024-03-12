import React, { useReducer } from "react";
import AuthReducer from "./reducer";

export const AuthContext = React.createContext();

const INITIAL_STATE = {
	isAuthenticated: false,
	token: null,
	user: null,
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

	// React.useEffect(() => {
	//     const token = localStorage.getItem("token");
	//     if (token != 'undefined' && token != null ) {
	//           dispatch({
	//             type: "LOGIN",
	//             payload: {
	//               user: JSON.parse(localStorage.getItem("user")),
	//               token
	//             },
	//           });
	//     }
	//   }, []);

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		const userString = localStorage.getItem("user");

		if (token && userString) {
			try {
				const user = JSON.parse(userString);
				dispatch({
					type: "LOGIN",
					payload: {
						user,
						token,
					},
				});
			} catch (error) {
				console.error("Error parsing user data:", error);
				// Handle parsing error (e.g., clear invalid data from localStorage)
				localStorage.removeItem("user");
			}
		}
	}, []);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
