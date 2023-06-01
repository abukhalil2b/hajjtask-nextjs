"use client";

import AppLayout from "@/components/layout/AppLayout";
import NewTaskModal from "@/components/NewTaskModal";
import Task from "@/components/Task";
import { useAuth } from "@/hooks/auth";
import fetcher from "@/util/fetcher";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const Page = () => {
  const query = useSearchParams();

  const { authenticating } = useAuth({ middleware: "auth" });

  const { data, isLoading } = useSWR(
    authenticating ? null : `/api/day/show/${query.get("day_id")}`,
    fetcher
  );

  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="mt-1 max-w-7xl mx-auto sm:px-6 lg:px-8 p-3">
        <div className="w-full card2 p-3 ">
          <div className="text-[#032a38]">
            <span className="text-sm text-[#ffb031]">{data.day.title} </span>
            {data.day.ar_date}
          </div>

          <div className="text-xs text-gray-400"> {data.day.en_date} </div>
        </div>
        <NewTaskModal day={data.day} />
        {data.tasks.map((task) => (
          <Task task={task} key={task.id}/>
        ))}
      </div>
    </AppLayout>
  );
};

export default Page;
