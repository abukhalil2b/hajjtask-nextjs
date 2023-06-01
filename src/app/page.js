"use client";

import fetcher from "@/util/fetcher";
import { useState } from "react";
import useSWR from "swr";
import TotalTask from "./components/TotalTask";
import TodayTask from "./components/TodayTask";
import PrevTask from "./components/PrevTask";
import NextTask from "./components/NextTask";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/hooks/auth";

export default function Home() {
  const { authenticating } = useAuth({ middleware: "auth" });

  const [show, setShow] = useState("todayTasks");

  const { data: dashboard, isLoading: pendingDashboard } = useSWR(
    authenticating ? null : "/api/dashboard",
    fetcher
  );

  if (!dashboard || pendingDashboard) return "Loading ...";

  return (
    <AppLayout>
      <div className="mt-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="card flex justify-between text-xs">
          <div
            onClick={() => setShow("totalTasks")}
            className={`option${
              show == "totalTasks" ? " option-selected" : ""
            }`}
          >
            كل المهام ({dashboard.totalTasks.length})
          </div>

          <div
            onClick={() => setShow("todayTasks")}
            className={`option${
              show == "todayTasks" ? " option-selected" : ""
            }`}
          >
            اليوم ({dashboard.todayTasks.length})
          </div>

          <div
            onClick={() => setShow("prevTasks")}
            className={`option${show == "prevTasks" ? " option-selected" : ""}`}
          >
            السابقة ({dashboard.prevTasks.length})
          </div>

          <div
            onClick={() => setShow("nextTasks")}
            className={`option${show == "nextTasks" ? " option-selected" : ""}`}
          >
            القادمة ({dashboard.nextTasks.length})
          </div>
        </div>

        {show == "totalTasks" && <TotalTask tasks={dashboard.totalTasks} />}
        {show == "todayTasks" && <TodayTask tasks={dashboard.todayTasks} />}
        {show == "prevTasks" && <PrevTask tasks={dashboard.prevTasks} />}
        {show == "nextTasks" && <NextTask tasks={dashboard.nextTasks} />}
      </div>
    </AppLayout>
  );
}
