"use client";

import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/auth";
import fetcher from "@/util/fetcher";
import useSWR from "swr";

const Page = () => {
  const { authenticating } = useAuth({ middleware: "auth" });

  const { data: tasks, isLoading } = useSWR(
    authenticating ? null : "/api/user/today/subtasks",
    fetcher
  );

  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="mt-1 max-w-7xl mx-auto sm:px-6 lg:px-8 p-3">
        {tasks.map((subtask) => (
          <div className="bg-white mt-1 p-1 rounded border text-xs">
            <div className="text-xl text-[#003b4f]">
              {" "}
              التعليق: {subtask.subtaskTitle}
            </div>
            <div className="text-xl text-[#003b4f]">
              {" "}
              المهمه: {subtask.taskTitle}
            </div>
            <div className="text-xs text-gray-500">
              {" "}
              العضو: {subtask.assignForName}
            </div>
            <hr className="my-2" />
            <div className="text-[10px] text-gray-300">
              {subtask.dayTitle} {subtask.dayArDate}{" "}
            </div>
            <div className="text-[10px] text-gray-300">
              تاريخ المهمة:{subtask.dayEnDate} تاريخ إنشاء التعليق:
              {subtask.subtasksCreatedAt}{" "}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default Page;
