import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const PORT = "";
// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({
    baseUrl: PORT || "http://localhost:3400",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Task"],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getTasks` endpoint is a "query" operation that returns data
    getTasks: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => `/tasks`,
      providesTags: ["Task"],
    }),
    getTask: builder.query({
      query: (taskId) => `/tasks/${taskId}`,
      providesTags: (result, error, arg) => [{ type: "Task", id: arg }],
    }),
    addNewTask: builder.mutation({
      query: (initialTask) => ({
        url: "/tasks",
        method: "POST",
        // Include the entire task object as the body of the request
        body: initialTask,
      }),
      invalidatesTags: ["Task"],
    }),
    editTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/update/${task._id}`,
        method: "PATCH",
        body: task,
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/delete/${task._id}`,
        method: "DELETE",
        body: task,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Task", id: arg.id }],
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/user/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Task"],
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Task"],
    }),
    logoutUser: builder.mutation({
      query: (user) => ({
        url: "/user/logout",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});
// Export the auto-generated hook for the `getTasks` query endpoint
export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useAddNewTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useLogoutUserMutation,
} = apiSlice;
