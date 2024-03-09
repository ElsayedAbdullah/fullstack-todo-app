import Button from "./ui/Button";
import { userData } from "../data";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { useState } from "react";
import { ITodo } from "../interfaces";
import { axiosInstance } from "../config/axios.config";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import TodoSkeleton from "./ui/TodoSkeleton";
import AddModal from "./AddModal";

const TodoList = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [queryVersion, setQueryVersion] = useState<number>(1);
  const [todoToEdit, setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    body: "",
  });

  const { isLoading, data } = useCustomQuery({
    queryKey: ["todoList", `${queryVersion}`],
    url: "/users/me?populate=todos",
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  });

  // Add Modal Handlers
  const closeAddModal = () => {
    setIsOpenAddModal(false);
  };
  const openAddModal = () => {
    setIsOpenAddModal(true);
  };

  // Edit Modal Handlers
  const closeEditModal = () => {
    setTodoToEdit({ id: 0, title: "", body: "" });
    setIsOpenEditModal(false);
  };
  const openEditModal = (todo: ITodo) => {
    setIsOpenEditModal(true);
    setTodoToEdit(todo);
  };

  // Delete Modal Handlers
  const closeDeleteModal = () => {
    setTodoToEdit({ id: 0, title: "", body: "" });
    setIsOpenDeleteModal(false);
  };

  const openDeleteModal = (todo: ITodo) => {
    setTodoToEdit(todo);
    setIsOpenDeleteModal(true);
  };

  // Delete Todo
  const submitDeleteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsUpdating(true);
    try {
      const { status } = await axiosInstance.delete(`/todos/${todoToEdit.id}`, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });
      if (status === 200) {
        closeDeleteModal();
        setQueryVersion((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading)
    return (
      <div className="space-y-4 divide-y divide-gray-200 rounded animate-pulse dark:divide-gray-700">
        {Array.from({ length: 3 }, (_, i) => (
          <TodoSkeleton key={i} />
        ))}
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-center my-10">
        {isLoading ? (
          <div className="flex animate-pulse items-center space-x-3">
            <div className="w-24 h-9 bg-gray-300 rounded-md dark:bg-gray-500"></div>
            <div className="w-32 h-9 bg-gray-300 rounded-md dark:bg-gray-500"></div>
          </div>
        ) : (
          <div className="space-x-3">
            <Button type="button" size={"sm"} onClick={openAddModal}>
              Add Todo
            </Button>
            {/* <Button
              type="button"
              size={"sm"}
              variant={"outline"}
              onClick={() => generateTodos(100)}
            >
              generate Todos
            </Button> */}
          </div>
        )}
      </div>
      <div className="space-y-4">
        {data?.todos.length ? (
          data?.todos.map((todo: { id: number; title: string }) => (
            <div
              key={todo.id}
              className="flex items-center justify-between hover:bg-gray-100 duration-300 p-4 rounded-md even:bg-gray-100"
            >
              <p className="w-full font-semibold">{todo.title}</p>
              <div className="flex items-center justify-end w-full space-x-3">
                <Button
                  type="button"
                  size={"sm"}
                  onClick={() => openEditModal(todo)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant={"danger"}
                  size={"sm"}
                  onClick={() => openDeleteModal(todo)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No Todos yet!</p>
        )}
      </div>

      {/* Add MODAL */}
      <AddModal
        isUpdating={isUpdating}
        closeAddModal={closeAddModal}
        isOpenAddModal={isOpenAddModal}
        setIsOpenAddModal={setIsOpenAddModal}
        setQueryVersion={setQueryVersion}
        setIsUpdating={setIsUpdating}
      />

      {/* EDIT MODAL */}
      <EditModal
        isUpdating={isUpdating}
        closeEditModal={closeEditModal}
        isOpenEditModal={isOpenEditModal}
        setIsOpenEditModal={setIsOpenEditModal}
        todoToEdit={todoToEdit}
        setIsUpdating={setIsUpdating}
        setQueryVersion={setQueryVersion}
      />

      {/* DELETE MODAL */}
      <DeleteModal
        isUpdating={isUpdating}
        closeDeleteModal={closeDeleteModal}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        submitDeleteHandler={submitDeleteHandler}
      />
    </>
  );
};

export default TodoList;
