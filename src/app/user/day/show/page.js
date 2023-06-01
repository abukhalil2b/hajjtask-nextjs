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
    authenticating
      ? null
      : `/api/user/day/show/${query.get("user_id")}/${query.get("day_id")}`,
    fetcher
  );

  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="mt-1 max-w-7xl mx-auto sm:px-6 lg:px-8 p-3">
        <Username user={data.user} />
        <div className="mt-1 card2 flex-col">
          <div className=""> {data.day.ar_date} </div>
          <div className="text-[#ffb031]"> {data.day.title} </div>
          <div className="text-xs text-gray-400"> {data.day.en_date} </div>
        </div>
        {user.id != data.user.id && (
          <NewTaskForMyTeamModal user={data.user} day={data.day} />
        )}
        {data.tasks.map((task) => (
          <Task task={task} />
        ))}
      </div>
    </AppLayout>
  );
};

export default Page;
