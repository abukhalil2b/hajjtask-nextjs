const Day = ({ day }) => {
  return (
    <div className="w-full">
      <div className="text-[#ffb031] text-xs"> {day.title} </div>
      <div className="text-base"> {day.ar_date} </div>
      <div className="text-xs text-gray-400"> {day.en_date} </div>
      <div className="mt-2 text-xs text-white font-serif">
        المهام: {day.tasks_count}{" "}
      </div>
      <div className="mt-2 text-xs text-white font-serif">
        المرفقات: {day.task_attachments_count}{" "}
      </div>
      <div className="mt-2 text-xs text-white font-serif">
        تعليقات: {day.task_subtasks_count}{" "}
      </div>
    </div>
  );
};


export default Day;