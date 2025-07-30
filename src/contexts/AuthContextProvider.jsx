import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import axios from "axios";




export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
const [auth, setAuth] = useLocalStorage("code2work_s11d2", null)

const isLoggedIn = () => {
    return !!auth;
  };

const login = async (formData) => {
    try {
      const res = await axios.post("https://nextgen-project.onrender.com/api/s11d2/login", formData);
      setAuth(res.data); // localStorage ve state'e yaz
      return { success: true };
    } catch (err) {
      return { success: false, message: "Giriş başarısız. Bilgileri kontrol et." };
    }
  };
 const authUserInfo = () => auth?.user || null;


    return (
        <AuthContext.Provider value={{auth, setAuth, login, isLoggedIn, authUserInfo,}}>
            {children} 
        </AuthContext.Provider>
    )
}
