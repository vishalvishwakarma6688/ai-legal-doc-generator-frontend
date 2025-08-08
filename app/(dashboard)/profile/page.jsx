"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    let data =
      typeof window !== "undefined"
        ? JSON.parse(
            localStorage.getItem("user") ||
              sessionStorage.getItem("user") ||
              null
          )
        : null;
    setUser(data);
  }, []);

  return (
    <div className="max-w-5xl mx-auto border rounded-lg shadow-lg border-gray-300 py-5 px-5">
      <div className="h-12 w-12 rounded-full">
        <img src="" alt="User Image" />
      </div>
      <h1 className="font-bold text-3xl text-center">{user.name}</h1>
      <h2 className="font-semibold text-center my-3">Plan : {user.plan}</h2>
    </div>
  );
};

export default page;
