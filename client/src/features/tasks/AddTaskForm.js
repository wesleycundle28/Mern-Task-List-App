import { useState } from "react";
import { toast } from "react-toastify";
import { useAddNewTaskMutation } from "../api/apiSlice";
import "./AddTaskForm.css";

export const AddTaskForm = () => {
  const [title, setTitle] = useState("");

  const [addNewTask, { isLoading }] = useAddNewTaskMutation();
  const onTitleChange = (e) => setTitle(e.target.value);

  const canSave = [title].every(Boolean) && !isLoading;

  const onSaveTaskClicked = async () => {
    if (canSave) {
      await addNewTask({ title })
        .unwrap()
        .then((payload) => {
          toast.success(payload.success);
          toast.error(payload.error);
        })
        .catch((error) => {
          console.log(`error: ${error}`);
        });
    } else if (!canSave) {
      toast.error("please fill out all fields");
    }
    setTitle("");
  };

  return (
    <section className="formContainer">
      <h2>Add New Task</h2>

      <form className="form">
        <input
          className="text"
          type="text"
          name="text"
          placeholder="enter new task"
          id="taskTitle"
          value={title}
          onChange={onTitleChange}
        />
        <button
          className="button"
          onClick={(e) => onSaveTaskClicked(e.preventDefault())}
        >
          Submit
        </button>
      </form>
    </section>
  );
};
