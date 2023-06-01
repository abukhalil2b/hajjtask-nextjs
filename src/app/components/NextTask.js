const NextTask = ({ tasks }) => {
  return (
    <div className="mt-1">
      {tasks.map((task) => (
        <div className="card2" key={task.id}>
          <div className="p-1 text-gray-800 flex justify-between">
            <div>
              <div className="text-xs text-red-800">{task.day.ar_date} </div>
              <div className="text-xl">{task.title}</div>
              <div className="flex gap-1">
                <div className="text-xs text-gray-400">
                  {" "}
                  من: {task.start_at}{" "}
                </div>
                <div className="text-xs text-gray-400">
                  {" "}
                  إلى: {task.end_at}{" "}
                </div>
              </div>

              {task.assign_by_id && (
                <div className="text-xs">
                  من:{" "}
                  <span className="text-orange-400">{task.assignby.name}</span>
                </div>
              )}
            </div>
          </div>

          <a
            className="text-orange-600 text-xs "
            href={`/task?task_id=${task.id}`}
          >
            عرض التفاصيل
          </a>
        </div>
      ))}
    </div>
  );
};

export default NextTask;
