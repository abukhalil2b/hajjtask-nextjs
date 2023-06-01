"use client";

import AppLayout from "@/components/layout/AppLayout";
import PrimaryButton from "@/components/ui/PrimaryButton";
import TextInput from "@/components/ui/TextInput";
import { useAuth } from "@/hooks/auth";
import axios from "@/lib/axios";
import fetcher from "@/util/fetcher";
import { useState } from "react";
import useSWR from "swr";

const Page = () => {
  const { authenticating } = useAuth({ middleware: "auth" });

  const { data, isLoading, mutate } = useSWR(
    authenticating ? null : "/api/user/index",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [search, setSearch] = useState("");

  function handleSubmit(event) {
    axios
      .post("/api/user/search", {
        search,
      })
      .then((res) => {
        console.log(res.data);
        mutate(res.data, false);
      });
    event.preventDefault();
  }

  function handleSearchChange(event) {
    setSearch(event.currentTarget.value);
  }

  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="p-3">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="text-xs">{data.title}</div>

          <form
            onSubmit={handleSubmit}
            className="mt-3 flex gap-1 justify-center items-center"
          >
            {/* @csrf */}
            <TextInput
              className="w-full card2"
              type="search"
              name="search"
              onChange={handleSearchChange}
              placeholder="البحث بالاسم"
            />
            <PrimaryButton className="w-16">بحث</PrimaryButton>
          </form>

          <div className="mt-1">
            {data.users.map((user, idx) => (
              <div className="card2" key={idx}>
                <a href={`/user/day/index?user_id=${user.id}`}>
                  <div>
                    {user.name}
                    <div className="text-xs text-[#032a38]">
                      {user.group.title}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    الهاتف: {user.phone}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
