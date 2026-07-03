import React, { useState } from "react";
import registerImage from "../assets/register.webp";
import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [filePreview, setFilePreview] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, password, gender);

    setName("");
    setEmail("");
    setPassword("");
    setGender("male");
  };

  const changeFileHandler = (e) => {
    console.log("Start ==>");
   let  file = e.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log("Image Converted ==>",reader.result);
      setFilePreview(reader.result);
      setFile(file);
    };
  };

  return (
    <div className="w-screen flex">
      {/* Left Side Register Form */}
      <div className="w-full md:w-1/2 flex flex-col mt-15 items-center">
        <form
          onSubmit={submitHandler}
          className="w-2/3 bg-white p-8 border border-gray-200 shadow-lg flex flex-col space-y-6"
        >
          <center>
            <div
              className="relative h-30 w-30 bg-gray-200 rounded-full flex items-center justify-center bg-cover bg-center bg-no-repeat border border-gray-200 shadow-md"
              style={{
                backgroundImage: filePreview==="" ? "" : `url(${filePreview})`,
              }}
            >
              <label htmlFor="profile">
                {" "}
                <FaCamera className="h-6 w-6 cursor-pointer absolute bottom-2 right-1" />
              </label>
              <input
                id="profile"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </center>
          <input
            type="text"
            className="bg-gray-100 shadow-sm outline-none w-full h-13 px-5"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
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
          <select
            className="bg-gray-100 shadow-sm outline-none w-full h-13 px-5"
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            required
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <button
            type="submit"
            className="bg-orange-500 text-white text-lg font-bold py-2 cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="w-2/3  bg-white p-4 border border-gray-200 shadow-lg flex justify-center mt-4">
          <p className="text-md text-black pr-1">Already have an account? </p>
          <Link
            to="/login"
            className="text-md text-orange-500 hover:cursor-pointer"
          >
            {" "}
            Sign in
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

export default Register;
