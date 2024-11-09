import { useEffect } from "react";
import { getCookie } from "../utils/cookie";
import { useRouter } from "next/router";

const AuthProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const cookie = getCookie();
    if (!cookie) {
      router.replace("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthProvider;
