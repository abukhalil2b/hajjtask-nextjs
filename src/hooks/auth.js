"use client";

import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    isLoading,
    mutate // todo: mutate
  } = useSWR(
    "/api/user",
    (url) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => res.data),
    {
      mutateOnFocus: false,
      mutateOnMount: false,
      mutateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }) => {
    await csrf();

    setErrors([]);

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const login = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    // setStatus(null);
    setErrors({
      phone: [],
      password: [],
    });

    axios
      .post("/api/user/login", props)
      .then((res) => {
        console.log(res)
        localStorage.setItem("token", res.data);
        mutate();
      })
      .catch((error) => {
        if (error.response?.status != 422) throw error;
        console.log(error.response.data.errors)
        setErrors(error.response.data.errors);
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }) => {
    await csrf();

    setStatus(null);
    setErrors([]);

    axios
      .post("/forgot-password", { email })
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    await csrf();

    setStatus(null);
    setErrors([]);

    axios
      .post("/reset-password", { token: router.query.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error) => {
        if (error.response.status != 422) throw error;

        setErrors(Object.values(error.response.data.errors).flat());
      });
  };

  const resendEmailVerification = ({ setStatus }) => {
    axios
      .post("/email/verification-notification")
      .then((response) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      // await axios.post('/logout')

      localStorage.removeItem("token");

      mutate();
    }

    console.log(error);

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware == "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (middleware == "auth" && error) logout();
  }, [user, error]);

  return {
    authenticating: isLoading,
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
