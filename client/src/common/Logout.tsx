import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logOut } from "../redux/reducer/auth";
import { useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "../redux/services/auth";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const [logoutUser] = useUserLogoutMutation();
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);

  const handleLogout = async () => {
    try {
      const res = await logoutUser({
        refreshToken: refreshToken,
      });
      if (res?.data?.success) {
        setIsLoggedOut(true);
        toast.success(res?.data?.msg, {
          position: "top-center",
        });
        dispatch(logOut());
        navigate("/");
      }
    } catch (error) {
      console.log("error in logout: ", error);
    }
  };
  useEffect(() => {
    if (!isLoggedOut) {
      handleLogout();
    }
  }, [isLoggedOut]);


  return null;
};

export default Logout;
