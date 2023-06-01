"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/auth";
import fetcher from "@/util/fetcher";
import useSWR from "swr";

const Page = () => {
  const { authenticating } = useAuth({ middleware: "auth" });

  const { data: tasks, isLoading } = useSWR(
    authenticating ? null : "/api/user/late/tasks",
    fetcher
  );

  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="mt-1 max-w-7xl mx-auto sm:px-6 lg:px-8 p-3">
        <div className="mt-1">
          {tasks.map((task, idx) => (
            <div className="mt-1 p-1 bg-white rounded border" key={idx}>
              <span className="text-red-800 text-sm">
                {task.dayTitle} {task.arDate}
              </span>

              <div className="text-red-800">{task.taskTitle} </div>

              <div className="text-red-800 text-sm">
                من: {task.taskStartAt} إلى: {task.taskEndAt}
              </div>

              {task.taskDoneAt && (
                <div className="text-red-800 text-sm">
                  تمت: {task.taskDoneAt}
                </div>
              )}

              <div className="text-gray-400 text-xs">
                اسندت لـ: {task.assignForName}
              </div>

              {task.assignByName && (
                <div className="text-gray-400 text-xs">
                  اسندت عن طريق: {task.assignByName}
                </div>
              )}

              <div className="text-gray-400 text-xs">{task.enDate}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
