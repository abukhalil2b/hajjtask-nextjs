import { useState } from "react";

const Task = ({ task }) => {
  const [show, setShow] = useState("");

  return (
    <div className="mt-1 w-full bg-[#b1efe6] border rounded p-3 ">
      <div className="flex justify-between">
        <div className="text-[#032a38]"> {task.title} </div>
        <div>
 
        </div>
      </div>

      {task.assign_by_id && (
        <div className="text-red-800 text-xs">
          {" "}
          عن طريق: {task.assignby.name}{" "}
        </div>
      )}

      <div className="flex gap-1">
        <div className="text-xs text-gray-400"> من: {task.start_at} </div>
        <div className="text-xs text-gray-400"> إلى: {task.end_at} </div>
      </div>

      <div>
        <div className="mt-2 flex gap-3 text-xs">
          <div
            onClick={() => setShow("attachment")}
            className={`sub-option ${
              show == "attachment" ? "sub-option-selected" : ""
            }`}
          >
            المرفقات:{task.task_attachments && task.task_attachments.length}
          </div>
          <div
            onClick={() => setShow("subtask")}
            className={`sub-option ${
              show == "subtask" ? "sub-option-selected" : ""
            }`}
          >
            تعليقات :{task.task_subtasks && task.task_subtasks.length}
          </div>
        </div>

        {show == "subtask" && (
          <div className="m-3">
            {task.task_subtasks &&
              task.task_subtasks.map((subtask) => (
                <div className="mt-3 text-xs text-[#032a38]" key={subtask.id}>
                  {subtask.title}
                </div>
              ))}
          </div>
        )}

        {show == "attachment" && (
          <div className="m-3">
            {task.task_attachments &&
              task.task_attachments.map((attachment) => (
                <div
                  className="mt-3 text-xs text-[#032a38] flex justify-between items-center border-b border-[#003b4f]"
                  key={attachment.id}
                >
                  <div>{attachment.title}</div>
                  <div>
                    <a href="{ Storage::url(attachment.url) }">الملف</a>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
