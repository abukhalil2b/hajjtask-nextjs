"use client";

import GuestLayout from "@/components/layout/GuestLayout";
import InputError from "@/components/ui/InputError";
import InputLabel from "@/components/ui/InputLabel";
import PrimaryButton from "@/components/ui/PrimaryButton";
import TextInput from "@/components/ui/TextInput";
import { useAuth } from "@/hooks/auth";
import __ from "@/util/__";
import { useState } from "react";

const Page = () => {
  const { login, authenticating } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  const [state, setState] = useState({
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    phone: [],
    password: [],
  });

  if (authenticating) return "Loading...";

  function handleChange(event) {
    const { name, value } = event.currentTarget;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    const { phone, password } = state;

    login({
      setErrors,
      phone,
      password,
    });

    event.preventDefault();
  }

  return (
    <GuestLayout>
      {/* <x-auth-session-status className="mb-4" :status="session('status')" /> */}

      <form onSubmit={handleSubmit}>
        {/* @csrf */}
        {/* <!-- phone Address --> */}
        <div>
          <InputLabel htmlFor="phone" value={__("phone")} />
          <TextInput
            id="phone"
            className="block mt-1 w-full bg-[#bdeae5] !border-black"
            type="number"
            name="phone"
            required
            autoFocus
            autoComplete="username"
            onInput={handleChange}
          />
          <InputError messages={errors.phone || []} className="mt-2" />
        </div>
        {/* <!-- Password --> */}
        <div className="mt-4">
          <InputLabel htmlFor="password" value={__("password")} />

          <TextInput
            id="password"
            className="block mt-1 w-full bg-[#bdeae5] !border-black"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            onInput={handleChange}
          />

          <InputError messages={errors.password || []} className="mt-2" />
        </div>
        {/* <!-- Remember Me --> */}
        <div className="block mt-4">
          <label htmlFor="remember_me" className="inline-flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
              name="remember"
            />
            <span className="mr-2 text-sm text-gray-600">تذكر بياناتي</span>
          </label>
        </div>
        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-3">تسجيل الدخول</PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Page;
