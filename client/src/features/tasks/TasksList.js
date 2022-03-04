import { Spinner } from "../../components/Spinner";
import "./Tasks.css";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { RiEditCircleFill } from "react-icons/ri";

import { useGetTasksQuery, useDeleteTaskMutation } from "../api/apiSlice";
import { toast } from "react-toastify";

let TaskExcerpt = ({ task }) => {
  const navigate = useNavigate();

  const [deleteTask] = useDeleteTaskMutation();

  const onDeleteClick = async () => {
    await deleteTask(task)
      .unwrap()
      .then((payload) => {
        toast.success(payload.success);
        toast.error(payload.error);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <section className="taskExcerpt" key={task._id}>
      <h3>{task.title}</h3>
      <div className="btnContainer">
        <button
          className="btnEdit"
          onClick={() => navigate(`/edit/${task._id}`)}
        >
          <RiEditCircleFill />
        </button>
        <button
          className="btnDelete"
          onClick={() => {
            onDeleteClick();
          }}
        >
          <TiDelete />
        </button>
      </div>
    </section>
  );
};

export const Tasks = () => {
  const {
    data: tasks = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksQuery();

  let content;
  if (isLoading) {
    content = <Spinner text="Loading" />;
  } else if (isSuccess) {
    content = tasks.map((task) => <TaskExcerpt key={task._id} task={task} />);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section className="taskContainer">
      <h1 className="title">Tasks</h1>
      {content}
    </section>
  );
};

export default Tasks;
