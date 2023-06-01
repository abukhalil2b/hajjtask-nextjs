"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/auth";
import fetcher from "@/util/fetcher";
import useSWR from "swr";

const Page = () => {
  const { authenticating } = useAuth({ middleware: "auth" });

  const { data: tasks, isLoading } = useSWR(
    authenticating ? null : "/api/super_admin/user/orderby_task_count",
    fetcher
  );

  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 p-3">
        <div className="mt-1">
          <div className="flex justify-between items-center">
            <div>الاسم</div>

            <div>مجموع المهام</div>
          </div>

          {tasks.map((task,i) => (
            <div className="mt-1 px-1 w-full bg-[#00bfa8] text-xs" key={i}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-[#032a38]"> {task.name}</div>

                  <div className=" text-gray-500">{task.group_title}</div>
                </div>

                <div>{task.count}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
