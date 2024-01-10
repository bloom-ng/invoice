import React from "react";
import Requests from "../../services/Requests";
import { AuthContext } from "../../providers/auth/AuthProvider";
import { useNavigate, Navigate } from "react-router-dom";
import image from "../../assets/image.jpg";

const Login = () => {
	const { dispatch } = React.useContext(AuthContext);
	const navigate = useNavigate();

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(false);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			let response = await Requests.Login(email, password);

			localStorage.setItem("token", response.token);
			localStorage.setItem("user", JSON.stringify(response.user));
			// setSuccess(true)
			// return navigate('/invoice');
			// location.reload();
			window.location.href = "/";
		} catch (error) {
			alert("Login Failed");
			setLoading(false);
		}
	};

	return (
		<>
			<div className="w-full h-screen flex items-center">
				{success && <Navigate to="/" replace={true} />}
				<div className="relative w-1/2 h-full flex flex-col sm:hidden lg:flex">
					{/* <div className="absolute top-[25%] left-[10%] flex flex-col">
              <h1 className='text-2xl'>Welcome To <span>Bloom Digital</span></h1>
            </div> */}
					<img
						src={image}
						className="w-full h-full object-cover"
						alt=""
					/>
				</div>

				<div className="w-full h-full bg-zinc-100 flex flex-col p-20 items-center justify-between">
					<h1 className="text-xl text-black font-bold sm:text-2xl text-center">
						Welcome To <br />
						<span className="text-4xl lg:text-2xl text-orange-600 font-bold">
							Bloom Digital Media
						</span>
					</h1>

					<div className="w-full flex flex-col max-w-[550px]">
						<div className="w-full flex flex-col mb-2">
							<h3 className="text-5xl lg:text-2xl font-semibold mb-2">
								Login
							</h3>
							<p className="text-xl md:text-lg mb-2">
								Welcome Back!
							</p>
						</div>
						<form onSubmit={handleLogin}>
							<div className="w-full flex flex-col">
								<input
									className="w-full text-black py-4 my-2 bg-transparent border-t-0 border-l-0 border-r-0
                     border-b-1 border-black
                     outline-none focus:outline-none"
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									placeholder="Email address"
									onChange={(e) => setEmail(e.target.value)}
								/>

								<input
									className="w-full text-black py-4 my-2 bg-transparent  border-t-0 border-l-0 border-r-0
                     border-b-1 border-black
                     outline-none focus:outline-none "
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									placeholder="Password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</div>
							<div className="w-full flex items-center justify-between">
								<div className="w-full flex items-center">
									<input
										type="checkbox"
										className="w-4 h-4 mr-2"
									/>
									<p className="text-sm">Remember Me</p>
								</div>
								<p className="text-sm cursor-pointer underline underline-offset-2 whitespace-nowrap font-medium">
									Forgot Password?
								</p>
							</div>

							<div className="w-full flex flex-col my-4">
								<button
									type="submit"
									className="text-white my-2 w-full bg-orange-600 
                      rounded-md p-4 flex items-center justify-center font-bold hover:bg-black"
								>
									{loading ? "Signing In" : "Sign in"}
								</button>
							</div>
						</form>
					</div>

					<div className="w-full flex items-center justify-center">
						<p>Dont have an account?</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
