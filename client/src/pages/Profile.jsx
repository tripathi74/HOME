import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  deleteUserFaiure,
  deleteUserStart,
  deleteUserSucces,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileref = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [fileUpoadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const perse = import.meta.env.VITE_PERSE;
    const cloudName = import.meta.env.VITE_CLOUDNAME;
      formData.append("upload_preset", perse); 
      formData.append("cloud_name", cloudName);

      // Start the upload and track progress
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Set the uploaded image URL in form data
      setFormData((prevData) => {
        const updatedData = {...prevData,
        avatar: data.secure_url, };
        return updatedData;
      });

      console.log("Upload successful:", data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      setFileUploadError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFaiure(data.message));
        return;
      }
      dispatch(deleteUserSucces(data));
    } catch (error) {
      dispatch(deleteUserFaiure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.length === 0) {
        setShowListingsError(true);
      }
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="pt-20 p-3 max-w-lg mx-auto">
      <h1 className="text-colorPrimary text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input 
          type="file" 
          ref={fileref} 
          hidden 
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          />
        <img
          onClick={() => fileref.current.click()}
          className="rounded-full h-24 w-24 object-cover
        cursor-pointer self-center mt-2"
          src={formData.avatar ? formData.avatar : currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          onFocus={(e) => (e.target.style.outline = 'none')}
          className="border p-3 rounded-lg bg-cyan-50 shadow-md"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          onFocus={(e) => (e.target.style.outline = 'none')}
          className="border p-3 rounded-lg bg-cyan-50 shadow-md"
        />
        <input
          type="number"
          placeholder="contact Number"
          id="phoneNumber"
          defaultValue={currentUser.phoneNumber}
          onChange={handleChange}
          onInput={(e) => {
            if(e.target.value.length > 10) e.target.value = e.target.value.slice(0,10);
          }}
          maxLength={10}
          inputMode="numeric"
          onFocus={(e) => (e.target.style.outline = 'none')}
          className="border p-3 rounded-lg bg-cyan-50 shadow-md"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          onFocus={(e) => (e.target.style.outline = 'none')}
          className="border p-3 rounded-lg bg-cyan-50 shadow-md"
        />
        <button
          disabled={loading}
          className="bg-colorPrimary text-white rounded-lg
        p-3 uppercase hover:opacity-85 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-85"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5 text-center">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>

      <button onClick={handleShowListings} className="text-colorPrimary w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold text-colorPrimary">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="bg-cyan-50 border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-colorPrimary font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-colorPrimary uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
