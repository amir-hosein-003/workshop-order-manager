"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { setCredentials } from "@/lib/store/features/authSlice";
import { getMe } from "@/lib/services/auth";

export function useGetMe() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const persist = async () => {
      try {
        const user = await getMe();
        dispatch(
          setCredentials({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              avatar: user.avatar,
            },
          })
        );
      } catch (err) {
        console.log(err);
      }
    };

    persist();
  }, [dispatch, router]);
}
