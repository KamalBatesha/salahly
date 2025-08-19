import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let UserContext = createContext();
export default function UserContextProvider(props) {
  let [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  let [token, setToken] = useState(localStorage.getItem("access_token"));
  let [userId, setUserId] = useState(getUserId);
  let [userRole, setUserRole] = useState(getUserRole);
  console.log(userRole);
  

  function getUserId() {
    if (token ||localStorage.getItem("access_token")) {
      let data = jwtDecode(token || localStorage.getItem("access_token"));
      if (data.id) {
        localStorage.setItem("userId", data.id);
      }
      return data.id;
    } else {
      return null;
    }
  }
  console.log("getUserId",getUserId());
  
  function getUserRole() {
    if (localStorage.getItem("access_token")||localStorage.getItem("refresh_token")) {
      let data = jwtDecode(localStorage.getItem("access_token")||localStorage.getItem("refresh_token"));
      return data.role;
    } else {
      return null;
    }
  }

  async function getUserInfo(){
    console.log(userRole,token);
    console.log(`${userRole=="admin"?"admin":"bearer"} ${token}`);
    
    
    await axios.get(`http://localhost:3000/user/getMyProfile`,{headers:{'authorization': `${userRole=="admin"?"admin":"bearer"} ${token}`}}).then((res) => {
      console.log(res.data);
      setUserInfo(res.data);
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      return res.data
    }).catch((err) => {
      console.log(err);
      console.log(err.response.data.message);
      if(err.response.data.message=="jwt expired"){
        refreshToken();
      }else{
        toast.error(err.response.data.message);
      }
    })

  }
  async function refreshToken(){
    console.log(`${userRole=="admin"?"admin":"bearer"} ${localStorage.getItem("refresh_token")}`);
    
    await axios.post('http://localhost:3000/auth/refreshToken',{},{headers:{'authorization': `${userRole=="admin"?"admin":"bearer"} ${localStorage.getItem("refresh_token")}`}}).then((res) => {
      console.log(res.data);
      localStorage.setItem("access_token", res.data.access_token);
      setToken(res.data.access_token);
      return res.data
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (
      token && getUserId()
    ) {
      setUserRole(getUserRole());
      setUserInfo(getUserInfo());
      setUserId(getUserId());
    }else{
      refreshToken();
    }
  }, [token]);
  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        token,
        setToken,
        getUserId,
        userId,
        setUserId,
        getUserRole,
        userRole,
        getUserInfo,
        setUserRole

      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
