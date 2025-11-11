"use client";

import Link from "next/link";

import { logOut } from "@/lib/services/auth";
import { clearCredentials } from "@/lib/store/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { axiosInstance } from "@/interceptors/axiosInterceptor";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const logout = async () => {
    await logOut();
    axiosInstance.defaults.headers.common["Authorization"] = "";
    dispatch(clearCredentials());
  };

  return (
    <div className="p h-16 flex flex-row items-center justify-between bg-secondary text-secondary-content">
      <div className="">
        <h1 className="text-xl font-bold">Workshop Order</h1>
      </div>

      <div className="flex flex-row items-center gap-4">
        {auth.isAuthenticated && auth.user ? (
          <div className="flex flex-row items-center gap-6">
            <p className="">{auth.user.name}</p>
            <button onClick={logout} className="btn btn-primary btn-outline rounded-full text-primary-content">
              Log out
            </button>
          </div>
        ) : (
          <>
            <Link href="/auth/sign-up" className="btn btn-primary rounded-full">
              Sign Up
            </Link>
            <Link
              href="/auth/sign-in"
              className="btn btn-neutral btn-outline rounded-full"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
