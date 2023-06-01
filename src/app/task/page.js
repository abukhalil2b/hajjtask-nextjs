"use client";

import AppLayout from "@/components/layout/AppLayout";
import PrimaryButton from "@/components/ui/PrimaryButton";
import TextInput from "@/components/ui/TextInput";
import { useAuth } from "@/hooks/auth";
import NewSubtaskModal from "./components/NewSubtaskModal";
import useSWR from "swr";
import fetcher from "@/util/fetcher";
import { useState } from "react";

const { useSearchParams } = require("next/navigation");

const Page = () => {
  const { authenticating } = useAuth({ middleware: "auth" });

  const query = useSearchParams();

  const {
    data: task,
    isLoading,
    mutate,
  } = useSWR(
    authenticating ? null : `/api/task/${query.get("task_id")}/show`,
    fetcher
  );

  function handleSubtaskAdd(subtask) {
    mutate((data) => ({
      ...data,
      task_subtasks: data.task_subtasks.concat(subtask)
    }), false);
  }

  const [fileTitle, setFileTitle] = useState()
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };


  if (authenticating || isLoading) return "Loading ...";

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-between">
        <div className="mt-1 p-1 text-gray-800">
          <div className="text-xl">
            <span className="text-[#ffb031]">المهمة:</span>
            <div className="text-white">{task.title}</div>
          </div>
          {task.assign_by_id != null && (
            <div className="text-[#ffb031]">
              <span> من:</span>
              <span className="mr-1 text-white">{task.assignby.name}</span>
            </div>
          )}
          <div className="text-[#ffb031]">
            <span className=" text-xs">تمت بتاريخ:</span>
            <span className="text-xs text-white"> {task.done_at}</span>
          </div>
        </div>

        <div className="p-1 mt-10 border border-[#00bfa8] rounded">
          مرفقات
          <form
            action="{ route('task.attachment.store') }"
            method="POST"
            encType="multipart/form-data"
          >
            {/* @csrf */}
            <div>
              <TextInput
                name="title"
                type="text"
                className="w-full text-black"
                placeholder="عنوان الملف"
              />
            </div>
            <div className="mt-5 w-80">
              <input type="file" name="attachment" />
            </div>
            <input type="hidden" name="task_id" value="{ task.id }" />
            <PrimaryButton className="mt-5 w-full">حــفــظ </PrimaryButton>
            {/* <x-input-error :messages="$errors.get('attachment')" className="mt-2" /> */}
          </form>
          {task.task_attachments.map((attachment) => (
            <div className="mt-5 card2 w-80 text-xs">
              <div className="text-[#032a38]"> {attachment.title}</div>
              <div className="mt-5 flex justify-between">
                <a href="{ Storage::url($attachment.url) }">الملف</a>

                <a
                  onclick="return confirm('هل متأكد');"
                  href="{ route('task.attachment.delete',$attachment.id) }"
                  className="text-red-400"
                >
                  حذف
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="p-1 w-80 mt-10 border border-[#00bfa8] rounded">
          تعليقات
          <div className="mt-5">
            <NewSubtaskModal task={task} onSubtaskAdd={handleSubtaskAdd} />
          </div>
          {task.task_subtasks.map((subtask) => (
            <div className="mt-5 card2 p-1 w-full text-xs text-[#003b4f] flex justify-between">
              {subtask.title}

              <a
                onclick="return confirm('هل متأكد');"
                href="{ route('task.subtask.delete',$subtask.id) }"
                className="text-red-400"
              >
                حذف
              </a>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Page;
