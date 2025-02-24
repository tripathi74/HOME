import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QAuth } from "../components/QAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="pt-20 p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold mt-7 mb-2 text-colorPrimary">Sign Up</h1>
      <p className='text-colorDarkGray text-sm mb-5 text-center'>
        (Create an Account if You want to resister your property!)
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          required
          className="bg-cyan-50 border p-3 rounded-lg shadow-md"
          id="username"
          onFocus={(e) => (e.target.style.outline = "none")}
          onChange={handleChange}
        ></input>
        <input
          type="email"
          placeholder="email"
          required
          className="bg-cyan-50 border p-3 rounded-lg shadow-md"
          id="email"
          onFocus={(e) => (e.target.style.outline = "none")}
          onChange={handleChange}
        ></input>
        <input
          type="number"
          placeholder="contact number"
          required
          className="bg-cyan-50 border p-3 rounded-lg shadow-md appearance-none"
          id="phoneNumber"
          onFocus={(e) => (e.target.style.outline = "none")}
          onChange={handleChange}
          onInput={(e) => {
            if(e.target.value.length > 10) e.target.value = e.target.value.slice(0,10);
          }}
          maxLength={10}
          inputMode="numeric"
        ></input>
        <input
          type="password"
          placeholder="password"
          required
          className="bg-cyan-50 border p-3 rounded-lg shadow-md"
          id="password"
          onFocus={(e) => (e.target.style.outline = "none")}
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="bg-colorPrimary text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <QAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-colorPrimary font-semibold hover:underline">
            Sign in
          </span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
