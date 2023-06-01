"use client";

import Day from "@/components/Day";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/auth";
import fetcher from "@/util/fetcher";
import useSWR from "swr";

const Page = () => {
  const { authenticating } = useAuth({ middleware: "auth" });

  const { data: days, isLoading } = useSWR(
    authenticating ? null : "/api/day/index",
    fetcher
  );

  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="mt-1 max-w-7xl mx-auto sm:px-6 lg:px-8 p-3">
        <div className="gap-2 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6">
          {days.map((day) => (
            <a className="card" href={`/day/show?day_id=${day.id}`} key={day.id}>
              <Day day={day} />
            </a>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
