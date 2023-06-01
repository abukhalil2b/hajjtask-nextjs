"use client";

import AppLayout from "@/components/layout/AppLayout";
import InputError from "@/components/ui/InputError";
import PrimaryButton from "@/components/ui/PrimaryButton";
import TextInput from "@/components/ui/TextInput";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import __ from "@/util/__";
import { useState } from "react";
import useSWR from "swr";

const Page = () => {
  const { authenticating } = useAuth({ middleware: "auth" });

  const [status, setStatus] = useState(null);

  const [state, setState] = useState({
    new_password: "",
  });

  const [errors, setErrors] = useState({
    new_password: [],
  });

  function handleChange(event) {
    const { name, value } = event.currentTarget;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    const { new_password } = state;

    axios
      .put("/api/user/password/update", {
        new_password,
      })
      .then((res) => {
        setState({ new_password: "" });
        setErrors({ new_password: [] });
        setStatus("password-updated");
      })
      .catch((error) => {
        if (error.response?.status != 422) throw error;

        setErrors(error.response.data.errors);
      });
      
    event.preventDefault();
  }

  if (authenticating) return "Loading ...";

  return (
    <AppLayout>
      <h2 className="font-semibold text-xl text-gray-800 leading-tight">
        {__("Profile")}
      </h2>

      <div className="p-3">
        <section>
          <header>
            <h2 className="text-lg">تحديث كلمة المرور</h2>
          </header>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              كلمة المرور الجديدة
              <TextInput
                id="new_password"
                name="new_password"
                type="password"
                className="mt-1 block w-full text-black"
                onInput={handleChange}
                autocomplete="new-password"
              />
              <InputError messages={errors.password || []} className="mt-2" />
            </div>

            <div className="flex items-center gap-4">
              <PrimaryButton>تحديث</PrimaryButton>
              {status === "password-updated" && (
                <p className="text-sm text-gray-600">تم التحديث</p>
              )}
            </div>
          </form>
        </section>
      </div>
    </AppLayout>
  );
};

export default Page;
