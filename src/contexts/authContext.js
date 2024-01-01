import { createContext, useContext, useState } from "react";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

export const authContext = createContext();
export const useAuth = () => {
  return useContext(authContext);
};
const baseUrl = "http://localhost:9000/api/";

export default function AuthProvider({ children, ...rest }) {
  const [loggindUser, setLoggindUser] = useLocalStorage({}, "friendsProject");
  const [loginError, setLoginError] = useState(null);

  const axioWithAuthInstance = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
    headers: {
      authorization: loggindUser.token,
    },
  });

  const loginUserAPI = (data) => {
    axios
      .post(`${baseUrl}login`, data)
      .then(function (response) {
        console.log(response);
        setLoggindUser(response.data);
        setLoginError(null);
      })
      .catch(function (error) {
        console.log(error);
        setLoginError(error.response.data.error);
      });
  };

  const isLoggedIn = loggindUser.hasOwnProperty("token");

  const logout = () => {
    console.log("logout");
    setLoggindUser({});
    axioWithAuthInstance
      .post("logout")
      .then(function (response) {
        console.log("logOut resolved", response);
      })
      .catch(function (error) {
        console.log("logOut error", error);
      });
  };

  return (
    <authContext.Provider
      value={{
        auth: loggindUser,
        loginUserAPI,
        isLoggedIn,
        logout,
        loginError,
        axioWithAuthInstance,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
