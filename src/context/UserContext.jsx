import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();
export default function UserContextProvider(props) {
  let [user, setUser] = useState(localStorage.getItem("userName"));
  let [token, setToken] = useState(localStorage.getItem("token"));
  let [userId, setUserId] = useState(getUserId);

  function getUserId() {
    if (localStorage.getItem("token")) {
      let data = jwtDecode(localStorage.getItem("token"));
      return data.id;
    } else {
      return null;
    }
  }

  useEffect(() => {
    // if (
    //   localStorage.getItem("userName") != null &&
    //   localStorage.getItem("token") != null
    // ) {
    //   setUser(localStorage.getItem("userName"));
    //   setToken(localStorage.getItem("token"));
    // }
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        getUserId,
        userId,
        setUserId,

      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
