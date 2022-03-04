import { Routes, Route } from "react-router-dom";
import TasksList from "./features/tasks/TasksList";
import { AddTaskForm } from "./features/tasks/AddTaskForm";
import { SingleTaskEdit } from "./features/tasks/SingleTaskEdit";
import { UserSignUp } from "./features/users/userSignUp";
import { UserLogIn } from "./features/users/userLogin";
import { Layout } from "./components/Layout";
import { Missing } from "./components/Missing";
import "./App.css";
import ProtectedRoutes from "./middleware/protectedRoutes";
import { Home } from "./features/home/homePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*public routes*/}
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="login" element={<UserLogIn />} />
        {/*private routes*/}
        <Route element={<ProtectedRoutes />}>
          <Route path="edit/:taskId" element={<SingleTaskEdit />} />
          <Route
            path="tasks"
            element={
              <>
                <AddTaskForm />
                <TasksList />
              </>
            }
          />
        </Route>
        {/*catch all*/}
        <Route path="/*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
