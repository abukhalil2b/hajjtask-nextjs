"use client";

import Day from "@/components/Day";
import AppLayout from "@/components/layout/AppLayout";
import NewTaskForMyTeamModal from "@/components/NewTaskForMyTeamModal";
import Task from "@/components/Task";
import Username from "@/components/Username";
import { useAuth } from "@/hooks/auth";
import fetcher from "@/util/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const Page = () => {
  const query = useSearchParams();

  const { authenticating, user } = useAuth({ middleware: "auth" });

  const { data, isLoading } = useSWR(
    authenticating ? null : `/api/user/day/index/${query.get("user_id")}`,
    fetcher
  );

  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="mt-1 max-w-7xl mx-auto sm:px-6 lg:px-8 p-3">
        <Username user={data.user} title="جدول مهام:" />
        <div className="mt-1 gap-2 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6">
          {data.days.map((day, idx) => (
            <a
              key={idx}
              className="card"
              href={`/user/day/show?user_id=${data.user.id}&day_id=${day.id}`}
            >
              <Day day={day} />
            </a>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
