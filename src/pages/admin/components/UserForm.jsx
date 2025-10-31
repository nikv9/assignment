import React, { useState } from "react";
import { toast } from "react-toastify";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeInputVal = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUser = (e) => {
    e.preventDefault();
    toast.success(`Account created for username - ${formData.username} `);
    setFormData({ username: "", password: "" });
  };

  return (
    <form
      onSubmit={createUser}
      className="flex flex-col gap-4 w-[30%] shadow-md border p-4 rounded-md h-fit"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Create User</h2>

      <div className="">
        <label className="text-sm">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={changeInputVal}
          className="w-full border rounded-md p-2 outline-none"
          required
        />
      </div>

      <div className="">
        <label className="text-sm">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={changeInputVal}
          className="w-full border rounded-md p-2 outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Create User
      </button>
    </form>
  );
};

export default UserForm;
