import React, { useEffect, useState } from "react";
import Instance from "../api/config";

const Page = () => {
  const googleLoginHandler = () => {
    window.location.href = "http://localhost:8080/api/auth/google/login";
  };
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await Instance.get("/auth/authenticate");

        console.log("hi", res.data);
        setUser(res.data);
      } catch (e) {
        console.log("hi2", e);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <button className="p-4 bg-red-100" onClick={() => googleLoginHandler()}>
        google login
      </button>

      <ul>
        <li>email: {user?.email}</li>
      </ul>
    </div>
  );
};

export default Page;
