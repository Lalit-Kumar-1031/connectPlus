
import { useState } from "react";
import registerImage from "../assets/register.webp";
import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <div className="w-screen flex">
      {/* Left Side Register Form */}
      <div className="w-full md:w-1/2 flex flex-col mt-15 items-center">
        <form
          onSubmit={submitHandler}
          className="w-2/3 bg-white p-8 border border-gray-200 shadow-lg flex flex-col space-y-6"
        >
          <input
            type="email"
            className="bg-gray-100 shadow-sm outline-none w-full h-13 px-5"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            className="bg-gray-100 shadow-sm outline-none w-full h-13 px-5"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button
            type="submit"
            className="bg-orange-500 text-white text-lg font-bold py-2 cursor-pointer"
          >
            Log in
          </button>
        </form>
        <div className="w-2/3  bg-white p-4 border border-gray-200 shadow-lg flex justify-center mt-4">
          <p className="text-md text-black pr-1">Don't have an account? </p>
          <Link
            to="/register"
            className="text-md text-orange-500 hover:cursor-pointer"
          >
            {" "}
            Sign up
          </Link>
        </div>
      </div>
      {/* Right Side Register Image */}
      <div className="hidden md:block w-1/2 ">
        <img src={registerImage} className="w-full object-cover block" />
      </div>
    </div>
  );
}

export default Login;
