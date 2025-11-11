"use client";

import React, { useEffect } from "react";
import { getMe } from "@/lib/services/auth";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCredentials } from "@/lib/store/features/authSlice";

import "@/interceptors/axiosInterceptor.ts";

type Props = {};

const HomeClient = (props: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const data = await getMe();
        console.log("getMe from home client: ", data);
        if(!data) return;
        dispatch(
          setCredentials({
            user: {
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role,
              avatar: data.avatar,
            },
          })
        );
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="w-full min-h-screen bg-neural">
      Home
      <div className="flex items-center gap-4 w-xl mx-auto">
        <button className="btn btn-primary">test</button>
        <button className="btn btn-secondary">test</button>
        <button className="btn btn-accent">test</button>
        <button className="btn btn-neutral">test</button>
      </div>
    </div>
  );
};

export default HomeClient;
