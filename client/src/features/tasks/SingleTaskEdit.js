import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGetTaskQuery, useEditTaskMutation } from "../api/apiSlice";
import { Spinner } from "../../components/Spinner";
import { RiSave3Fill } from "react-icons/ri";
import "./SingleTaskEdit.css";
import { toast } from "react-toastify";
import { TasksButton } from "../../components/Button";

export const SingleTaskEdit = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const { data: task, isLoading, isSuccess } = useGetTaskQuery(taskId);
  const [updateTask] = useEditTaskMutation();

  const [title, setTitle] = useState(task?.title);

  const onTitleChange = (e) => setTitle(e.target.value);

  const onSaveTaskClicked = async () => {
    if (title)
      try {
        await updateTask({ id: taskId, title })
          .unwrap()
          .then((payload) => {
            toast.success(payload.success);
            toast.success(payload.error);
          });
      } catch (error) {
        console.log(error);
      }
    if (isSuccess) {
      navigate("/tasks");
    }
  };

  if (isLoading) {
    return <Spinner text="Loading" />;
  }
  if (!task) {
    return (
      <section>
        <h2>Task Not Found!</h2>
      </section>
    );
  }

  return (
    <section className="editContainer">
      <form className="editContainer">
        <h2>Edit Task</h2>
        <p>{task.title}</p>
        <div className="inputButtonDiv">
          <input
            type="text"
            id="taskTitle"
            name="taskTitle"
            onChange={onTitleChange}
          />
          <button
            className="btnUpdate"
            onClick={(e) => onSaveTaskClicked(e.preventDefault())}
          >
            <RiSave3Fill />
          </button>
        </div>
      </form>

      <TasksButton>Back to Tasks</TasksButton>

      {/* <button className="button" onClick={() => navigate("/tasks")}>
        Back To Tasks
      </button> */}
    </section>
  );
};
