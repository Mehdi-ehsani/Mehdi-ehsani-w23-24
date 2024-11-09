import { getCookie } from "../utils/cookie";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
      console.log("auth")

    const token = getCookie("token");
    token ? null : router.replace("/login");
}, []);
  return children;
};

export default AuthProvider;
